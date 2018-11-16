const debug = require('debug')('merginator:rx');
const { from, timer, combineLatest } = require('rxjs');
const { switchMap, pluck, flatMap, distinct, skipWhile, share, tap } = require('rxjs/operators');
const Client = require('./client');

module.exports = ({url, token, upvotes_limit, interval}) => {
  const client = new Client(url, token);

  function myMergeRequests$() {
    return timer(0, interval).pipe(
      switchMap(() => from(client.fetchMergeRequests())),
      pluck('data')
    );
  }

  function newMergeRequest$() {
    return myMergeRequests$().pipe(
      flatMap(mr => mr),
      distinct(mr => mr.id)
    );
  }

  function mergeRequest$(mr) {
    return timer(0, interval).pipe(
      switchMap(() => from(client.getMergeRequest(mr))),
      pluck('data')
    );
  }

  function upvotes$(shareMergeRequest) {
    return shareMergeRequest.pipe(
      pluck('upvotes'),
      tap(upvotes => debug('Merge request upvotes', upvotes)),
      skipWhile(upvotes => upvotes < upvotes_limit)
    );
  }

  function mergeStatus$(shareMergeRequest$) {
    return shareMergeRequest$.pipe(
      pluck('merge_status'),
      tap(mergeStatus => debug('Merge request merge_status', mergeStatus)),
      skipWhile(mergeStatus => mergeStatus !== 'can_be_merged')
    );
  }

  const newMergeRequestSubscription = newMergeRequest$().subscribe(mr => {
    console.log(new Date(), 'There is a new merge request', mr.title);

    const shareMergeRequest$ = mergeRequest$(mr).pipe(share());
    const merginatorSubscription$ = combineLatest(upvotes$(shareMergeRequest$), mergeStatus$(shareMergeRequest$)).subscribe(() => {
      console.log(`Merginator is about to merge ${mr.title}`)
      client.merge(mr).then(() => {
        console.log(`Merginator merged ${mr.title}`);
        merginatorSubscription$.unsubscribe();
      }).catch(err => {
        console.log('Merginator should call Chuck Norris if this error still occurs...', err);
      })
    });
  });

  return newMergeRequestSubscription;
}
