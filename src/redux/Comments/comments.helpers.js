import { db } from '../../firebase/utils';

export const handleAddComment = comment => {
    return new Promise( (resolve, reject) => {
        db.collection('comments')
        .doc()
        .set(comment)
        .then(() => {
            resolve();
        })
        .catch(err => {
            reject(err);
        })
    })
} 

export const handleFetchComments = (productId) => {
    return new Promise( (resolve, reject) => {
        db.collection('comments')
        .where('productId', '==', productId)
        .get()
        .then( (snapshot) => {
            const comments = snapshot.docs.map(doc => {
                return {
                    ...doc.data(),
                    commentId: doc.id,
                }
            })
            resolve(comments);
        })
        .catch(err => {
            reject(err);
        })
    })
}
