import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () =>{
    return async(dispatch) =>{
        const fetchData = async () =>{
            const response = await fetch(
                'https://asyncproject-f8b56-default-rtdb.firebaseio.com//cart.json'
            )

            if(!response.ok){
                throw new Error('Could not fetch Data')
            }

            const data = await response.json()

            return data
        }

        try{
            const cartData = await fetchData();
            dispatch(cartActions.replaceCart({
                items: cartData.items || [],
                totalQuantity:cartData.totalQuantity
            }))
        }catch(error){
            dispatch(uiActions.showNotifications({
                status:'error',
                title: 'Error',
                message:'Fetching cart data failed'
              })
            )

        }
    }
}




export const sendCartData=  (cart) =>{

    return async (dispatch)=>{
        dispatch(
            uiActions.showNotifications({
            status:'pending',
            title: 'Sending',
            message:'Sending cart details'
        })
    )
    const sendRequest = async () =>{
        const response = await fetch('https://asyncproject-f8b56-default-rtdb.firebaseio.com//cart.json',
            {
              method: 'PUT',
              body: JSON.stringify(
                {
                    items: cart.items, 
                    totalQuantity: cart.totalQuantity
                })
          })
          if(!response.ok){
            throw new Error('Sending cart data fail')
          }

    }
    try{
        await sendRequest();
        dispatch(
            uiActions.showNotifications({
            status:'success',
            title: 'Success',
            message:'Sent cart data successfully'
            })
        )
    }catch(error){
        dispatch(uiActions.showNotifications({
            status:'error',
            title: 'Error',
            message:'Sending cart data failed'
          })
        )

    }
}

};