import { selector } from "recoil";
import { courseState } from "../atoms/course";


export const isCourseLoading = selector({
    key: "isCourseLoading",
    get: ({get})=>{
        const state = get(courseState);
        return state.isLoading;
    }
})

export const courseTitle = selector({
    key: "courseTitle",
    get: ({get})=>{
        const state = get(courseState);
        if(state.course){
            return state.course.title;
        } else {
            return "";
        }
    }
})

export const coursePrice = selector({
    key: "coursePrice",
    get: ({get})=>{
        const state = get(courseState);
        if(state.course){
            return state.course.price;
        } else {
            return "";
        }
    }
})

export const courseImage = selector({
    key: "courseImage",
    get: ({get})=>{
        const state = get(courseState);
        if(state.course){
            return state.course.image;
        } else{
            return "";
        }
    }
})