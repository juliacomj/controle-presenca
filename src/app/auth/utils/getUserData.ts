
import supabase from "../../utils/supabase/client";
import { Employee } from "../../interfaces/Employee/Employee";

export const getUserData = async () => {

const email = getCookie('email')
  if(email){
    const { data } = await supabase
    .from("employee")
    .select().eq('email', `${email}`)
    if(data){
        const employee = data as Employee[]
        return employee[0];
    }

  }
};

function getCookie(cookie: string) {
    let name = cookie + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }