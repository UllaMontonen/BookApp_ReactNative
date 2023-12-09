# ReadBook Mobile Application

PROJECT STILL IN PROGRESS

Language used: `ReactNative`

The project has been implemented as a final project in the Mobile Programming course. The course was completed at Haaga-Helia University of Applied Sciences as part of my degree in Business Information Technology.

## Introduction

### Functionality of the Application:
In the project, a mobile application was built, allowing users to create their own account and retrieve book information via the Google Books API interface. In the search view, book covers and some details about the books are displayed. Each book can be viewed in more detail by pressing the "read more" button. In this view, more information about the book is available. The description shows the first 300 characters, and by pressing the "show more" button, the remaining text can be revealed. Pressing the "show less" button allows users to condense the description again. The user can also save searched books to their reading list.

### Functionalities Used:
- Google Books API interface
- Nesting navigators: Tab, and Stack
- ***** Authentication: sign in and registratin *****
- ***** Firebase *****
- MUI library
- IonIcons and expo-constants


## Database
***** Add information about the used database. *****


## Google Books API
The application utilizes the `Google Books API`. The ReadBook app employs a straightforward search feature. You can learn more about the API's functionality on Google's official page: [https://developers.google.com/books/docs/overview](https://developers.google.com/books/docs/overview)

## Authentication

***** Add login information. ******
***** Add Registration information. *****

## Testing
Testing was primarily conducted as end-to-end testing. The key functionalities performed as expected, but a few deficiencies were identified during testing that could be further improved:
* In the Search view, only the results from the first page of the Google Books API are displayed. This could be enhanced to show more books.
* On iPhone devices, a notable issue was that the keyboard occasionally covered the page content disruptively.
* The placeholder image did not consistently display correctly in all situations. While the functionality itself works as intended, sometimes, instead of the placeholder image, the image from the previous search appeared based on consecutive searches. This occurs only when the book does not have its own image, and consecutive searches have been performed.

## Instalation information
First, you need to install a programming environment, if you do not already have one. I am using [Visual Studio Code](https://code.visualstudio.com/). Then you can clone ReadBook repository to your own file by navigating to that file in your terminal and then using command `git clone https://github.com/UllaMontonen/BookApp_ReactNative.git`.

You also need to install Expo Go if you want to test the app on your mobile device. You can find it from App Store or Google Play. Alternatively you can use emulator. If you are using Mac, then you also need to install Watchman. 

Please also see the documentation for [ReactNative](https://reactnative.dev) and [Expo](https://docs.expo.dev/get-started/installation/)

To run the project, open the project from your programming environment and give a `npx expo start`command in your code terminal. After this you will see a QR code in your terminal and by scanning that in your phone, an Expo Go will start.
