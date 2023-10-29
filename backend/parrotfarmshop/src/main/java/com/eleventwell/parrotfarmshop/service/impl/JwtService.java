package com.eleventwell.parrotfarmshop.service.impl;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {
private static final String SECRET_KEY="c38fa49f1f8e88e74d0b520443bb68696d5f3f2c7d8be93eb9b5b1bb2748f165";
    public String extractUserName(String token){

        return exreactClaim(token,Claims::getSubject);
    }
    public String generateToken(UserDetails userDetails){
        return  generateToken(new HashMap<>(),userDetails);
    }
public String generateToken(
        Map<String, Object> extraClaims,
        UserDetails userDetails
){
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24))
                .signWith(getSignInkey(), SignatureAlgorithm.HS256)
                .compact();
}
    public <T> T exreactClaim(String token, Function<Claims, T> claimsResolver){
final Claims claims = extracAllClaims(token);

return claimsResolver.apply(claims);
    }
    public boolean isTokenValid(String token, UserDetails userDetails){
        final String username = extractUserName(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }
    private boolean isTokenExpired(String token){
        return extracExpiration(token).before(new Date());
    }

    private Date extracExpiration(String token) {

    return  exreactClaim(token,Claims::getExpiration);
    }

    private Claims extracAllClaims(String token){
       return Jwts
               .parserBuilder()
                .setSigningKey(getSignInkey())
               .build()
               .parseClaimsJws(token)
                .getBody();
    }

    public Key getSignInkey(){
byte[] keyBytes = Base64.getDecoder().decode(SECRET_KEY);
  return Keys.hmacShaKeyFor(keyBytes);
    }
}
