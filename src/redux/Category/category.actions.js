import categoryTypes from "./category.types";

export const addCategoryStart = (category) => ({
    type: categoryTypes.ADD_CATEGORY_START,
    payload: category,
});

export const fetchCategoriesStart = () => ({
    type: categoryTypes.FETCH_CATEGORIES_START,
});

export const setCategories = categories => ({
    type: categoryTypes.SET_CATEGORIES,
    payload: categories,
});
