import store from '../store';

export const fetch_post = () => {
    return {
        type: "FETCH_USER"
    }
}
export const get_post = (post) => {
    return {
        type: "FETCHED_USER",
        data: post
    }
}
export const get_error = () => {
    return {
        type: "GET_ERROR"
    }
}

export const thunk_action = username => {
    const user = username.replace(/\s/g, "");
    store.dispatch(fetch_post());
    return function (dispatch, getState) {
        return fetch(`https://api.github.com/users/${user}`)
            .then(data => data.json())
            .then(data => {
                if (data.message === "Not Found") {
                    throw new Error("No such user found!!");
                } else dispatch(get_post(data));
            })
            .catch(err => dispatch(get_error()));

    }
}