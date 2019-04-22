function RedditFeed(RedditService, $q) {
    const ctrl = this;

      // List of reddit posts to display    
      ctrl.feed = [];
      // ctrl.show = false;
    
      /**
       * Call https://www.reddit.com/r/aww/.json
       * and set ctrl.feed to be the results
       */

      ctrl.fetchAwwSubreddit = () => {
        // Call service, then set our data
        return $q(function(resolve, reject) {
          RedditService.fetchAwwSubreddit()
          .then( (response) => {

            // Get children from data
            let children = response.data.data.children;
            
            // Organize in to objects for each one
            children.forEach( function(child, index) {
              let childObj = {
                title: child.data.title,
                img: child.data.thumbnail,
                permalink: child.data.permalink
            }

            // Add to feed array
              ctrl.feed.push(childObj);
              console.log(response);
            
            // Resolve the promise
            if ( index === (children.length -1) ) {
              resolve();
            }
          });

//             console.log(response);
//             // Do something with this data

//             data.data.forEach( (item) => {
//               ctrl.feed.push(`{title:response.data.data.children[i].data.author}`);
            
          });
        });
      };
    
    ctrl.fetchAwwSubreddit()
    .then( () => {
      alert('completed');
    })
}
  
  angular.module('RedditApp').component('redditFeed', {
    template: `
   
    <div class="container" ng-repeat="post in $ctrl.feed">
      <h2 class="the-title"> {{ post.title }} </h2>
      <img src="{{ post.img }}" />
      <a href="{{ post.permalink }}">Click Here!</a>
    </div>
   
    `, // or use templateUrl
    controller: RedditFeed,
});