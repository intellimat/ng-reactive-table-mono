# ng-reactive-table

This is a CRUD web application developed with **Angular 15** (see the full stack in the section below).
The API server referenced by the frontend returns some data (i.e. users with certain attributes), while the frontend provides the ability to _view_, _update_, and _delete_ data via HTTPS requests.
Filtering and pagination have also been implemented in the frontend.

### Stack

- Angular 15.1.4
- NgRx
- Angular Material
- ngx-skeleton-loader

### Main features

- Users can be viewed as cards or as rows in a table.
- Users can be filtered by typing on the search filter. The filter status does not change when you switch between views (card view, table view). The filter looks for matches in a user's name or email address.
- A user can be edited by clicking on the :pencil2: icon placed in the table operations column. When you click on the :heavy_check_mark: icon (which appears after you click on the pencil icon), an http _patch_ request is fired and a loading component (ngx-skeleton-loader) is displayed while we wait for the response. The table row will show the new edited user after having received an ok response from the server.
- A confirmation dialog is displayed when you click on the :wastebasket: icon in the operations column. If you confirm the operation by clicking the "Yes" button, an http _delete_ request is fired and a loading component (ngx-skeleton-loader) is displayed while we wait for the response. The affected table row will be removed after having received an ok response from the server.
- When you click the "Add user" button, a form dialog is displayed. If a name, email and department are filled in correctly, the "Submit" button will be enabled and an http _post_ request (with the new user) will be fired when the "Submit" button is clicked.

### About NgRx

Personally, I like to manage the state of an application with a flux-based library. In this project NgRx is used to manage users data, filter and all operations (edit, add, delete) with users. The state has the following structure:

    {
         users: {
    	    data: [
    	      {
    	        id: 1,
    	        name: 'Brenden Hatchett',
    	        email: 'bhatchett@eventbrite.com',
    	        department: 'Legal',
    	        created: '2022-07-07T12:15:00Z'
    	      },
    	    ],
    	    loading: false,
    	    searchWord: '',
    	    errors: [],
    	    idsOfUsersBeingUpdated: []
    	}
     }

To get the filtered data, you only need to call the selector "selectFilteredUsers", so no duplicated data is stored.
_Pagination_ has also been implemented as a selector: first users are filtered, then they are returned based on the current index and the page size.
The verbose property _IdsOfUsersBeingUpdated_ is needed to manage the loading state of each single table row. A user id is pushed to this list every time we are performing an update on that user and the same user is deleted from the mentioned list each time the update request is completed. So in the table componente we use this property to check if the loading component needs to be shown on a specific row.

### Docker

Github actions have been configured so that a new image is pushed to my docker hub account every time a commit has been pushed.

Docker Image: _intellimat/ng-reactive-table_

### Deployment

The frontend has been deployed on Vercel and you can access it through the following link: https://ng-reactive-table.vercel.app/
The backend API have been deployed on another platform, but it's just a json-server so nothing cool about it!

### Last but not least

This project was implemented for fun and in relative short amount of time hence there are things that can be improved!
Feel free to reach out to me to ask me questions, give suggestions or to tell me that you appreciated this project :stuck_out_tongue_winking_eye:
