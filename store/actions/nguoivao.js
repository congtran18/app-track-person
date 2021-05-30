import Nguoivao from "../../models/nguoivao";

export const DELETE_NGUOIVAO = "DELETE_NGUOIVAO";
export const CREATE_NGUOIVAO = "CREATE_NGUOIVAO";
export const SET_NGUOIVAO = "SET_NGUOIVAO";

export const fetchNguoivao = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const respone = await fetch(
        `https://appdoan-36a06-default-rtdb.firebaseio.com/nguoivao/${userId}.json`
      );

      if (!respone.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await respone.json();
      const loadednguoivao = [];
      for (const key in resData) {
        loadednguoivao.push(
          new Nguoivao(
            key,
            resData[key].date,
            resData[key].image,
            resData[key].realname,
          )
        );
      }

      dispatch({
        type: SET_NGUOIVAO,
        nguoivao: loadednguoivao.reverse(),
        // userProducts: loadedProducts.filter((prod) => prod.ownerId === userId),
        // productsType: loadedProducts.filter((prod) => prod.type === type2),
      });
    } catch (err) {
      // send to custom analytics server or handle error somehow.
      throw err;
    }
  };
};

// export const fetchProductstype = (type2) => {
//   return async (dispatch, getState) => {
//     const userId = getState().auth.userId;
//     try {
//       const respone = await fetch(
//         "https://appfasion-default-rtdb.firebaseio.com/products.json"
//       );

//       if (!respone.ok) {
//         throw new Error("Something went wrong!");
//       }

//       const resData = await respone.json();
//       const loadedProducts = [];
//       for (const key in resData) {
//         loadedProducts.push(
//           new Product(
//             key,
//             resData[key].ownerId,
//             resData[key].title,
//             resData[key].imageUrl,
//             resData[key].description,
//             resData[key].price,
//             resData[key].type,
//           )
//         );
//       }

//       dispatch({
//         type: SET_PRODUCTS,
//         products: loadedProducts,
//         Productstype: loadedProducts.filter((prod) => prod.type === type2),
//       });
//     } catch (err) {
//       // send to custom analytics server or handle error somehow.
//       throw err;
//     }
//   };
// };

// export const deleteProduct = (productId) => {
//   return async (dispatch, getState) => {
//     const token = getState().auth.token;
//     const response = await fetch(
//       `https://appdoan-36a06-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`,
//       {
//         method: "DELETE",
//       }
//     );
//     if (!response.ok) {
//       throw new Error("Something went wrong!");
//     }
//     return { type: DELETE_PRODUCT, pid: productId };
//   };
// };

// export const createNguoivao = (realname, image, date) => {
//   return async (dispatch, getState) => {
//     const token = getState().auth.token;
//     const userId = getState().auth.userId;
//     const respone = await fetch(
//       `https://appdoan-36a06-default-rtdb.firebaseio.com/nguoivao/${userId}.json?auth=${token}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           realname,
//           image,
//           date,
//         }),
//       }
//     );

//     const resData = await respone.json();

//     dispatch({
//       type: CREATE_NGUOIVAO,
//       nguoivaoData: {
//         id: resData.name,
//         realname,
//         image,
//         date,
//       },
//     });
//   };
// };

