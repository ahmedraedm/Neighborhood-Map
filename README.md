# Neighborhood Map Project

This project is a requirement for the Udacity Front-End developer Nanodegree program. It is a Single page application that uses Google Maps APIs to identify a previously hard coded locations on google maps. The application uses Wikimedia as a 3rd party service in order to gather information related to the selected location. These information represented in the form of text and images contained in an info window that pops up on marker click.  

## How to install

* Clone the project with HTTPS: [https://github.com/ahmedraedm/Neighborhood-Map.git]
* Install all project dependencies with `npm install`
* Start the development server with `npm start`

## Application functionality

The application main page consists of:

* Title bar
* Side bar navigation
* Google map interface

The application is equipped with a built in ServiceWorker functionality. It automatically precaches all of the local assets and keep them up to date as updates are deployed. The service worker uses a cache-first strategy for handling all requests for local assets, including the initial HTML, ensuring that the web app is reliably fast, even on a slow or unreliable network.

The ServiceWorker can be accessed in the production mode after running the following command:

`npm run build`

### Title bar

The title bar contains the application title and an Hamburger menu icon. The Hamburger menu icon appears on screen sizes below 950px while the side bar navigation menu is hidden out.

### Side bar navigation

The Side bar navigation contains:

* Search input field: Filters places list by place name.
* Places list: A list of hard coded places of well known places in Egypt to visit whick are:

    * Mortuary Temple of Hatshepsut
    * Temple of Karnak
    * Valley of the Queens
    * Medinet Habu
    * The Great Pyramid of Giza
    * The Great Sphinx of Giza
    * Cairo Tower
    * Mosque of Sultan Hassan
    * Museum of Islamic Art Cairo

### Google map interface

On application start, Google map interface will contain by default all places listed in the side bar navigation menu represnted by the default markers. 

Each Marker has a specific info window which pops up on marker click. Only one Info window can be showed at a time. Each Info window shows:
* Place title
* An article related to the selected place
* Link of the article address
* Images related to the selected place
* Link to the source domain of information

### Sources

* [http://cuneyt.aliustaoglu.biz/en/using-google-maps-in-react-without-custom-libraries/]
* [https://www.wikipedia.org/]
* [https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#making-a-progressive-web-app]

### Services

* Google Maps JavaScript API
* Google places API
* WikiMedia API

### License

This project is a public work. Feel free to do what ever you want with it.