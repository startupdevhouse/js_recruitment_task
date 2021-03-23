# JS Recruitment Task

## Description

We would like you to create an application that will display list of news fetched from The Guardian. You should use their API, which can be found here: [https://open-platform.theguardian.com/](https://open-platform.theguardian.com/)

Goal of this task is to check your JavaScript knowledge so please don't use any additional libraries. There are some exceptions, though. You can use `fetch` for http requests and if you are going to write some tests, you can of course use tools like `testing-library` or `jest`.

**Important**

- Please treat this tasks as something that would be shown to our customer, so focus on quality and best practices (and we don't mean only from the code point of view :) ).
- Also feel free to update or customize starter config. For example you can change `prettier` or `eslint` config or add something else that you are used to use on daily basis.
- We have provided sample html + css styling, so you can focus on writing JS code but you can change default layout if you want.

## (Bonus) My approach to solving this task.

1. Get know the guardian API
2. Created account & get the API key
3. Created a function to fetch data from API using fetch
4. Specify the section parameter and put it as function argument
5. Added listener for section drop-down
6. Specify current page parameter and put it as function argument
7. Added listener for active page drop-down
8. Fix date formating, it was ISO format when comes from API
9. Create today date and the date 30 days ago
10. Use the created dates as fetch parameters to limit the request
11. Fix for active page rendering based on api data
12. Created sample data and tried to save it on localstorage as array of objets and then get the data from localStorage
13. At this point I realized I need to split my part of my loadData function into another function to make it more clean
14. After a while i get localStorage working as expected
15. Added content search functionality
16. Added some placeholder for Read Later list to inform user how to add news to their list
17. I've added some basic error handling to inform user that news cannot be loaded
18. Now since i have all functionality working i can refactor my code to make it more efficient and clean
19. Added some small styling changes

## Requirements

- Display list of news from last 30 days
- Add pagination: 10 items per page
- Add news filtering based on section selection from dropdown. You can restrict it only to: `sport`, `books`, `business`, `culture`
- Add search functionality for filtering news content based on provided phrase
- Each news list element should have following elements:
  - Title
  - Section name
  - Date of publication
  - Link to full article (open in new window)
  - "Read Later" button
- Clicking "Read later" button should add selected news to the "Read later" section on the right. Those elements should be stored somewhere and displayed even after refresh.
- Each element from "read later" can be removed by clicking "delete" button
- (Bonus) It would be beneficial if you would write some kind of tests, either unit or integration
- (Bonus) If you will find time, please briefly describe your approach to solving this task.

## Tools used

In order to keep things simple we used only really small number of libs for this boilerplate:

- [Parcel](https://en.parceljs.org) as a bundler
- [Milligram](https://milligram.io/) and [Normalize](https://necolas.github.io/normalize.css/) for some simple styling
- [Eslint](https://eslint.org/) and [Prettier](https://prettier.io/) for static code check
- [PostCSS](https://postcss.org/) with [Autoprefixr](https://autoprefixer.github.io/) for css compatibility
