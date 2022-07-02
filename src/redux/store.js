//For configuration
import { configureStore } from "@reduxjs/toolkit"

import settingReducer from './setting'

export const store = configureStore({
    reducer: {
        setting: settingReducer
    }
});


