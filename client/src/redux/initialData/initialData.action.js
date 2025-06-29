import axios from "axios";
import {
  initialDataFail,
  initialDataRequest,
  initialDataSuccess,
} from "./initialData.reducer";
const url= process.env.REACT_APP_BASE_URL;

export const getInitialData = async (dispatch) => {
  try {
     
    dispatch(initialDataRequest());
    const data = await axios({
      method: "GET",
      url: `${url}/api/v1/initialData`,
    });
    dispatch(initialDataSuccess(data.data));
  } catch (error) {
    dispatch(initialDataFail(error));
  }
};
