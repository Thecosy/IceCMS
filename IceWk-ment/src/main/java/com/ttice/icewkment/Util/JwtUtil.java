package com.ttice.icewkment.Util;

import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.UUID;

@Slf4j
@Component
public class JwtUtil {

    private static long time = 1000*60*60*24*24;//失效间隔
    private static String signatuer = "admin";

    public static String createToken(Integer userId){
        JwtBuilder jwtBuilder = Jwts.builder();
        String jwtToken = jwtBuilder
                //header
                .setHeaderParam("typ","JWT")
                .setHeaderParam("alg","HS256")
                //payload
                .claim("username","admin")
                .claim("role","admin")
                .setSubject(userId+"")
                .setExpiration(new Date(System.currentTimeMillis()+time))
                .setId(UUID.randomUUID().toString())
                //signature
                .signWith(SignatureAlgorithm.HS256,signatuer)
                .compact();
        return jwtToken;
    }
    public static boolean checkToken(String token){
        if (token == null) {
            return false;
        }
        try {
        Jws<Claims> claimsJws = Jwts.parser()
                .setSigningKey(signatuer)
                .parseClaimsJws(token);
        } catch (Exception e) {
            return false;
        }
        return true;
    }
    public Claims getClaimByToken(String token) {
        try {
            return Jwts.parser()
                    .setSigningKey(signatuer)
                    .parseClaimsJws(token)
                    .getBody();
        }catch (Exception e){
            log.debug("validate is token error ", e);
            return null;
        }
    }

    /**
     * token是否过期
     * @return  true：过期
     */

    public boolean isTokenExpired(Date expiration) {
        return expiration.before(new Date());
    }
}
