
let jwt = require("jsonwebtoken");
let secretObj = require("../config/jwtConfig");


function checkAuth (req, res, next) {
    const validToken = req.cookies['userToken'];
    if (validToken == null) {
        return res.send("<script>alert('권한이 없습니다. 로그인해주세요.'); location.href='/user/Login'; </script>");
    } else {
        let decoded = jwt.verify(validToken, secretObj.secret);
        if(decoded) {
            next();
        } else { 
            res.send("<script>alert('인증 실패. 로그인해주세요.'); location.href='/user/Login'; </script>"); 
        }
    }
}

function checkID (req, res, next) {
    const userToken = req.cookies['userToken'];
    let decodedToken = jwt.verify(userToken, secretObj.secret);
    if(decodedToken) {
        //토큰의 payload에서 login_id만 빼온 뒤 쿠키에 저장. 1분동안 유효
        //res.cookie('id', decodedToken.login_id,  { expires: new Date(Date.now() + 60000) }); 
        //res.json({ id : decodedToken.login_id });
        
        //next();
        return decodedToken.login_id;
    }
}

/*function checkSeller (req, res, next) {

}*/

module.exports = { checkAuth, checkID, }