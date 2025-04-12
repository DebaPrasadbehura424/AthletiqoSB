package backendlite.component;

import java.util.Date;
import java.util.function.Function;

import org.springframework.stereotype.Component;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class Jutils {

    public String SECRET_KEY = "iamgoingtochnagewholebackendfromnodetospringboot";
    public long EXPIRATION_TIME = 1000 * 60 * 60;

    @SuppressWarnings("deprecation")
    public String generateToken(String username) {

        return Jwts.builder().setSubject(username).setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY).compact();
    }

    public boolean isTokenVlaid(String token, String username) {
        return (!isTokenExpired(token) && username.equals(extractSubject(token)));
    }

    public boolean isTokenExpired(String token) {
        return extractClaim(token, Claims::getExpiration).before(new Date());
    }

    public String extractSubject(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    private <T> T extractClaim(String token, Function<Claims, T> getClaim) {
        Claims claims = extractClaimAll(token);
        return getClaim.apply(claims);
    }

    @SuppressWarnings("deprecation")
    private Claims extractClaimAll(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();

    }

}
