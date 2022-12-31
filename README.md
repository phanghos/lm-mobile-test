# lm-mobile-test
Take-home test for the position of Mobile Engineer @ LM

## How to run the app

Make sure to first clone the repo with `git clone https://github.com/phanghos/lm-mobile-test.git`

Then, go to the directory where the repo was cloned and install the dependencies with `npm i`

### Extra steps for iOS

For iOS, it is required to install the Pod dependencies, so go to the `ios` directory and run `pod install`

That's it! Now, you can now run either `npm run ios` or `npm run android`. Enjoy!

### Technical Details

- Built with *React Native* and *TypeScript* with :heart:
- Navigation with *React Navigation v6*
- State management with `zustand` as an alternative to *Redux* (for a change!)
- Skeleton placeholders for giving feedback of loading state (`react-native-skeleton-content-nonexpo`)
- Image carousel built with `react-native-snap-carousel` (:warning: a patch had to be applied with `patch-package`)
- Icons are SVGs thanks to `react-native-svg`
- Opinionanted *ESLint* and *Prettier* configurations
- Path / module alias thanks to `babel-plugin-module-resolver`

### Features I decided to implement

- Empty placeholder displayed in case of empty filter search results
- Error placeholder with the possiblity to retry and refetch the request in case of error when fetching the list of hotels displayed
- Skeleton placeholder displayed when the request is in progress
- Image carousel with the list of hotel images (with pagination for the ones that have 1+ image)
- Placeholder for an image in the carousel displayed if the image can't be loaded
- Filtering by hotel name and stars with the possibility to reset each one individually
- Possilibity to reset all filters at once (it is required to tap on the *Apply* CTA)
- When filtering, the *Apply* CTA will be disabled if the result of filtering with the current filters returns 0 results
- When filtering, the *Apply* CTA will be disabled if the filters set are the same as the last ones applied
- When filtering, the number of results that will be returned after applying the filters is displayed in the *Apply* CTA

### Post-submission checklist and nice-to-have's

- [ ] Add tests of helpers and utils with *Jest*
- [ ] Add tests for screens with *React Testing Library*
- [ ] Add filters for the rest of fields
- [ ] Animate the header when scrolling
- [ ] Display more details in the hotel details screen
- [ ] Make the filter screen look & feel more like a modal

*Built by Roberto Tatasciore with :heart:*
