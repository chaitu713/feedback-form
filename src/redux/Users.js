import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    name: "Chaitanya",
    mobile: "7207789114",
    feedback:
      "-:¦:-GREAT SELLER WHO SHIPPED QUICKLY! HOPE YOU VISIT AGAIN SOON -:¦:-",
    multimedia: "",
  },
  {
    id: 2,
    name: "Phani",
    mobile: "8107781391",
    feedback:
      "*:☯.Thank You!.•:*¨¨*:•. Highly Recommend•:*¨¨*:☯.Asset to Amazon.•:*",
    multimedia: "",
  },
  {
    id: 3,
    name: "Aravind",
    mobile: "8105665018",
    feedback: "Great communication. A pleasure to do business with.",
    multimedia: "",
  },
  {
    id: 4,
    name: "Karunakar",
    mobile: "7207777027",
    feedback:
      "Thank you for an easy, pleasant transaction. Excellent seller. A++++++.",
    multimedia: "",
  },
  {
    id: 5,
    name: "Hussain",
    mobile: "7202789312",
    feedback:
      "♥-`ღ´-♥-`ღ´- ♥ -`ღ´-♥ BEST TRANSACTION EVER -`ღ´-♥-`ღ´- ♥ -`ღ´-♥.-ღ´-♥",
    multimedia: "",
  },
  {
    id: 6,
    name: "KR",
    mobile: "9840289204",
    feedback:
      ":-•:*Smooth'Transaction*:•.-:¦:-•*Great Seller*•-:¦:-•:*Thank You*•-:",
    multimedia: "",
  },
];

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
