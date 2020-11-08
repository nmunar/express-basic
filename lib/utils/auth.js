const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET_KEY;

function createToken(data) {
  return jwt.sign(data, secret, { algorithm: "HS256", expiresIn: "1h" });
}

function checkToken(req, res, next) {
  // Extrae el token de la solicitud enviado a través de cualquiera de los dos headers especificados
  // Los headers son automáticamente convertidos a lowercase
  let token = req.headers[ 'x-access-token' ] || req.headers[ 'authorization' ];
  
  // Si existe algún valor para el token, se analiza
  // de lo contrario, un mensaje de error es retornado
  if( token ) {

    // Si el token incluye el prefijo 'Bearer ', este debe ser removido
    if ( token.startsWith( 'Bearer ' ) ) {
        token = token.slice(7, token.length );
        // Llama la función verify del paquete jsonwebtoken que se encarga de realizar la validación del token con el secret proporcionado
        jwt.verify( token, secret, ( err, decoded ) => {
      
        // Si no pasa la validación, un mensaje de error es retornado
        // de lo contrario, permite a la solicitud continuar
        if( err ) {
          return res.json( {
            success: false,
            message: 'Token is not valid'
          } );
        } else {
          req.decoded = decoded;
          next();
        }
      } );
    }
  } else {
    
    return res.json( {
      success: false,
      message: 'Auth token is not supplied'
    } );

  }

};

function checkTokenUser(req, res, next) {
    // Extrae el token de la solicitud enviado a través de cualquiera de los dos headers especificados
    // Los headers son automáticamente convertidos a lowercase
    let token = req.headers[ 'x-access-token' ] || req.headers[ 'authorization' ];
    
    // Si existe algún valor para el token, se analiza
    // de lo contrario, un mensaje de error es retornado
    if( token ) {
  
      // Si el token incluye el prefijo 'Bearer ', este debe ser removido
      if ( token.startsWith( 'Bearer ' ) ) {
          token = token.slice(7, token.length );
          // Llama la función verify del paquete jsonwebtoken que se encarga de realizar la validación del token con el secret proporcionado
          jwt.verify( token, secret, ( err, decoded ) => {
        
          // Si no pasa la validación, un mensaje de error es retornado
          // de lo contrario, permite a la solicitud continuar
          if( err ) {
            return res.json( {
              success: false,
              message: 'Token is not valid'
            } );
          } else {
            if (decoded.role != "user") {
                res.json({ message: "Permission denied." });
              } else {
                next();
              }
          }
        } );
      }
    } else {
      
      return res.json( {
        success: false,
        message: 'Auth token is not supplied'
      } );
  
    }
  
  };

  function checkTokenAdmin(req, res, next) {
    // Extrae el token de la solicitud enviado a través de cualquiera de los dos headers especificados
    // Los headers son automáticamente convertidos a lowercase
    let token = req.headers[ 'x-access-token' ] || req.headers[ 'authorization' ];
    
    // Si existe algún valor para el token, se analiza
    // de lo contrario, un mensaje de error es retornado
    if( token ) {
  
      // Si el token incluye el prefijo 'Bearer ', este debe ser removido
      if ( token.startsWith( 'Bearer ' ) ) {
          token = token.slice(7, token.length );
          // Llama la función verify del paquete jsonwebtoken que se encarga de realizar la validación del token con el secret proporcionado
          jwt.verify( token, secret, ( err, decoded ) => {
        
          // Si no pasa la validación, un mensaje de error es retornado
          // de lo contrario, permite a la solicitud continuar
          if( err ) {
            return res.json( {
              success: false,
              message: 'Token is not valid'
            } );
          } else {
            if (decoded.role !="admin") {
                res.json({ message: "Permission denied." });
              } else {
                next();
              }
          }
        } );
      }
    } else {
      
      return res.json( {
        success: false,
        message: 'Auth token is not supplied'
      } );
  
    }
  
  };

  function checkTokenMaster(req, res, next) {
    // Extrae el token de la solicitud enviado a través de cualquiera de los dos headers especificados
    // Los headers son automáticamente convertidos a lowercase
    let token = req.headers[ 'x-access-token' ] || req.headers[ 'authorization' ];
    
    // Si existe algún valor para el token, se analiza
    // de lo contrario, un mensaje de error es retornado
    if( token ) {
  
      // Si el token incluye el prefijo 'Bearer ', este debe ser removido
      if ( token.startsWith( 'Bearer ' ) ) {
          token = token.slice(7, token.length );
          // Llama la función verify del paquete jsonwebtoken que se encarga de realizar la validación del token con el secret proporcionado
          jwt.verify( token, secret, ( err, decoded ) => {
        
          // Si no pasa la validación, un mensaje de error es retornado
          // de lo contrario, permite a la solicitud continuar
          if( err ) {
            return res.json( {
              success: false,
              message: 'Token is not valid'
            } );
          } else {
            if (decoded.role !="master") {
              res.json({ message: "Permission denied." });
            } else {
              next();
            }
          }
        } );
      }
    } else {
      
      return res.json( {
        success: false,
        message: 'Auth token is not supplied'
      } );
  
    }
  
  };

  function validateToken(token, req, res, next) {
    console.log("vds");
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        
        return res.send(401).json({
          success: false,
          message: "Token is not valid",
        });
        
      } else {
        req.decoded = decoded;
        next();
      }
    });
  }

module.exports = {
  checkToken: checkToken,
  createToken: createToken,
  checkTokenUser: checkTokenUser,
  checkTokenAdmin: checkTokenAdmin,
  validateToken:validateToken,
  checkTokenMaster:checkTokenMaster,
};
