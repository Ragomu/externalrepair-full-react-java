package br.com.uisa.externalrepair.config.security;

import br.com.uisa.externalrepair.adapter.out.web.dto.UisaTokenPayload;
import br.com.uisa.externalrepair.application.domain.model.PersonType;
import br.com.uisa.externalrepair.application.domain.model.Supplier;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.Claim;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class TokenProvider {
    @Value("${security.jwt.secret}")
    private String jwtSecret;

    public String generateToken(Supplier user) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(jwtSecret);
            return JWT.create()
                    .withSubject(user.getUsername())
                    .withIssuedAt(new Date())
                    .withClaim("document", user.getDocument())
                    .withClaim("code", user.getCode())
                    .withClaim("name", user.getName())
                    .withClaim("role", user.getRole().name())
                    .withClaim("isUisa", "false")
                    .sign(algorithm);
        } catch (JWTCreationException e) {
            throw new JWTCreationException("Erro ao gerar token", e);
        }
    }

    public String generateTokenUisa(UisaTokenPayload payload, List<PersonType> personTypes) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(jwtSecret);

            PersonType admin = personTypes.getFirst() != null ? personTypes.getFirst() : PersonType.ADMIN;

            PersonType personType = personTypes.size() > 1 ? PersonType.ADMIN : admin;

            return JWT.create()
                    .withSubject(payload.data().email())
                    .withIssuedAt(new Date())
                    .withClaim("document", "1")
                    .withClaim("personKey", payload.data().personKey())
                    .withClaim("name", payload.data().name())
                    .withClaim("email", payload.data().email())
                    .withClaim("jobTitle", payload.data().jobTitle())
                    .withClaim("role", personType.name())
                    .withClaim("isUisa", "true")
                    .sign(algorithm);
        } catch (JWTCreationException e) {
            throw new JWTCreationException("Erro ao gerar token UISA", e);
        }
    }

    public String validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(jwtSecret);
            return JWT.require(algorithm).build().verify(token).getSubject();
        } catch (JWTVerificationException e) {
            throw new JWTVerificationException("Erro ao validar token", e);
        }
    }

    public String getPayload(String token, String key) {
        try {
            return JWT.decode(token).getClaims().get(key).asString();
        } catch (JWTVerificationException e) {
            throw new JWTVerificationException("Erro ao obter payload do token", e);
        }
    }

    public Map<String, Claim> getAllClaims(String token) {
        try {
            return JWT.decode(token).getClaims();
        } catch (JWTVerificationException e) {
            throw new JWTVerificationException("Erro ao obter todos os claims do token", e);
        }
    }

    public Boolean isUisaToken(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        return token != null && getPayload(token, "isUisa").equals("true");
    }
}
