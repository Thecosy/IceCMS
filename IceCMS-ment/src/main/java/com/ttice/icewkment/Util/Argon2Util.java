package com.ttice.icewkment.Util;

import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;

public class Argon2Util {

    // 生成密码哈希
    public static String hashPassword(String password) {
        Argon2 argon2 = Argon2Factory.create();
        try {
            // 配置参数可以根据需要调整
            int iterations = 3;  // 迭代次数
            int memory = 65536;  // 内存消耗，单位KB
            int parallelism = 1; // 并行度
            return argon2.hash(iterations, memory, parallelism, password.toCharArray());
        } finally {
            argon2.wipeArray(password.toCharArray()); // 清除密码
        }
    }

    // 验证密码
    public static boolean verifyPassword(String hash, String password) {
        Argon2 argon2 = Argon2Factory.create();
        try {
            return argon2.verify(hash, password.toCharArray());
        } finally {
            argon2.wipeArray(password.toCharArray()); // 清除密码
        }
    }

    public static void main(String[] args) {
        String password = "mySecurePassword";
        // 哈希密码
        String hash = hashPassword(password);
        System.out.println("Hashed password: " + hash);

        // 验证密码
        boolean isValid = verifyPassword(hash, password);
        System.out.println("Password is valid: " + isValid);
    }
}
