export const checkValidateData=(email,password)=>{
//we will user regex here
const isEmailValid=/^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
const isPasswordValid=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
//.test() is a built-in method of JavaScript's RegExp (Regular Expression) object.
if(!isEmailValid) return "Email ID is not valid";

if(!isPasswordValid) return "password is not valid"

return null;
}