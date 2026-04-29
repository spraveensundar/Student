import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Persistortype, photos, servicetype } from "./types";


export const initialState: Persistortype = {
    serviceinprogress: "",
    beforewashpics: [],
    afterwashpics: [],
    persistservice: "none",
    isaddonservice: false,
    addonpics: [],
    damagepics: [],
    scrapstatus: {},
    scrapservice: {}
}

const persistor = createSlice({
    name: 'persistor',
    initialState,
    reducers: {
        update_serviceinprogress: (state, action: PayloadAction<any>) => {
            state.serviceinprogress = action.payload
        },
        update_beforepics: (state, action: PayloadAction<photos[]>) => {
            state.beforewashpics = action.payload
        },
        update_afterpics: (state, action: PayloadAction<photos[]>) => {
            state.afterwashpics = action.payload
        },
        setPersistservice: (state, action: PayloadAction<servicetype>) => {
            state.persistservice = action.payload
        },
        setAddonservice: (state, action: PayloadAction<boolean>) => {
            state.isaddonservice = action.payload
        },

        update_addonpics: (state, action: PayloadAction<photos[]>) => {
            state.addonpics = action.payload
        },
        update_damagepics: (state, action: PayloadAction<{ item: any, index: number, photoindex: number }>) => {
            const res = [...state.damagepics]
            res[action.payload.index].photos[action.payload.photoindex].image = action.payload.item
            console.log(res, "RESUXRES");
            state.damagepics = res
        },

        addremove_damagepics: (state, action: PayloadAction<{ index?: any, type: "add" | "remove", image?: any, photoindex?: number }>) => {
            const res = [...state.damagepics]
            if (action.payload.type === "add") {
                res[action.payload.index].photos.push({
                    title: "image" + (res[action.payload.index].photos.length + 1),
                    image: action.payload.image
                })
            } else {
                const photos = res[action.payload.index].photos
                photos.splice(action.payload.photoindex, 1)
            }
            console.log(res, "RES");

            state.damagepics = res
        },
        setDamagepics: (state, action: PayloadAction<photos[]>) => {
            state.damagepics = action.payload
        },
        setDamageissues: (state, action: PayloadAction<{ index: number, issues: string }>) => {
            const res = [...state.damagepics]
            res[action.payload.index].issues = action.payload.issues
            state.damagepics = res
        },
        clearservice: (state) => {
            state.serviceinprogress = ""
            state.beforewashpics = []
            state.afterwashpics = []
            state.isaddonservice = false,
                state.addonpics = []
            state.damagepics = []
        },
        scrapService: (state, action: PayloadAction<any[]>) => {
            state.scrapservice = action.payload
        },
        scrapStatus: (state, action: PayloadAction<any[]>) => {
            state.scrapstatus = action.payload
        },
    }
})

export const {
    update_serviceinprogress,
    update_beforepics,
    update_afterpics,
    setPersistservice,
    setAddonservice,
    update_addonpics,
    setDamagepics,
    update_damagepics,
    addremove_damagepics,
    setDamageissues,
    clearservice,
    scrapStatus
} = persistor.actions
export const persistorSelector = (state: { persistor: Persistortype }) => state.persistor;

export default persistor.reducer

