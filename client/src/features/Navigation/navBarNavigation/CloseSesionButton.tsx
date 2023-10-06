import { Button } from 'antd';
import { useAuth } from '../../../Authenticator/AuthPro';

interface Props{
  text: string,
  path: string,
  closeSeion: object
}

function CloseSeionButton({text, path, closeSeion} : Props){
  const auth = useAuth();
  
  const logout = async () => {
    try {
      const endPoint = import.meta.env.VITE_BASENDPOINT_BACK + "/sing-out";
      const refreshToken = auth.getRefreshToken();
      const response = await axios.delete(endPoint, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
        data: null,
      });
      if (response.status === 200) {
        auth.signOut();
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return  <Button type='link' style={{ marginLeft: '70px', color:"#FFFF" }} href={path} >{text}</Button> 
}



export default CloseSeionButton