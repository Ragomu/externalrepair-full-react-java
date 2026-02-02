package br.com.uisa.externalrepair.application.util;

import java.security.SecureRandom;
import java.util.Random;
import org.springframework.stereotype.Component;

@Component
public class RandomPasswordGenerator {

    private static final String UPPER_CASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final String LOWER_CASE = "abcdefghijklmnopqrstuvwxyz";
    private static final String NUMBERS = "0123456789";
    private static final String SPECIAL_CHARACTERS = "!@#$%?";

    private static final String ALL_CHARACTERS =
            UPPER_CASE + LOWER_CASE + NUMBERS + SPECIAL_CHARACTERS;

    public String generatePassword() {
        StringBuilder passwordBuilder = new StringBuilder();
        Random random = new SecureRandom();

        passwordBuilder.append(getRandomCharacter(UPPER_CASE, random));
        passwordBuilder.append(getRandomCharacter(LOWER_CASE, random));
        passwordBuilder.append(getRandomCharacter(NUMBERS, random));
        passwordBuilder.append(getRandomCharacter(SPECIAL_CHARACTERS, random));

        for (int i = 4; i < 12; i++) {
            char randomChar = getRandomCharacter(ALL_CHARACTERS, random);
            passwordBuilder.append(randomChar);
        }

        for (int i = 0; i < 12; i++) {
            int randomIndex = random.nextInt(12);
            char temp = passwordBuilder.charAt(i);
            passwordBuilder.setCharAt(i, passwordBuilder.charAt(randomIndex));
            passwordBuilder.setCharAt(randomIndex, temp);
        }

        return passwordBuilder.toString();
    }

    private static char getRandomCharacter(String characterSet, Random random) {
        int index = random.nextInt(characterSet.length());
        return characterSet.charAt(index);
    }
}
