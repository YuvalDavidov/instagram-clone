export const reportService = {
    reportPost
}

async function reportPost(r) {
    try {
        console.log(r);
        return true
    } catch (error) {
        console.log('there is a problem with reporting this post', error);

    }
}