package com.ttice.icewkment.Util;

import net.coobird.thumbnailator.Thumbnails;
import sun.font.FontDesignMetrics;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

public class ImgGenerateUtils {

    //得到该字体字符串的长度
    public static int getWordWidth(Font font, String content) {
        FontDesignMetrics metrics = FontDesignMetrics.getMetrics(font);
        int width = 0;
        for (int i = 0; i < content.length(); i++) {
            width += metrics.charWidth(content.charAt(i));
        }
        return width;
    }
    /**
     *  写文字
     */
    private File imgFiles;
    private static File outFiles;
    public static File ImgGenerate(File imgFiles , String title , String content) {
//        imgFile = new File("/Users/macbook/Desktop/321.jpeg");
//        File imgFile = imgFiles;
        try {
            //文件先用 BufferedImage 对象为其截取1360x544的大小
            BufferedImage bufferedImage = Thumbnails.of(imgFiles).size(1360, 544).keepAspectRatio(false).asBufferedImage();
//            ImageIO.write(bufferedImage, "png", new File("/Users/macbook/Desktop/2.jpeg"));
//            BufferedImage bg = ImageIO.read(new File("/Users/macbook/Desktop/2.jpeg"));
            Graphics2D g = bufferedImage.createGraphics();
            Graphics2D c = bufferedImage.createGraphics();
            //裁剪图片
            // 写标题
            // 使用 setRenderingHint 设置抗锯齿
            g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
            g.setColor(new Color(255, 255, 255, 255));
            g.setFont(FontUtil.getFont(FontUtil.FZLTTH_GBK_FONT, 94.0f));
            c.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
            c.setColor(new Color(255, 255, 255, 255));
            c.setFont(FontUtil.getFont(FontUtil.FZLTTH_GBK_FONT, 44.0f));
            //计算该字体文本的长度
            //定义文本
            String text=title;
            //定义字体
            Font textfont = FontUtil.getFont(FontUtil.FZLTTH_GBK_FONT, 94.0f);
            Font contentfont = FontUtil.getFont(FontUtil.FZLTTH_GBK_FONT, 44.0f);

            int textWidth = getWordWidth(textfont, text);
            int contentWidth = getWordWidth(contentfont, content);
            /**
             *  换行算法
             */
            FontDesignMetrics metrics = FontDesignMetrics.getMetrics(textfont);
            // 获取字符的最高的高度
            int height = metrics.getHeight();
            int width = 0;
            int count = 0;
            int total = text.length();
            String subWords = text;
            int b = 0;
            for (int i = 0; i < total; i++) {
                // 统计字符串宽度 并与 预设好的宽度 作比较
                if (width <= 1200) {
//                    System.out.println("宽啦");
                    width += metrics.charWidth(text.charAt(i)); // 获取每个字符的宽度
                    count++;
                } else {
//                    System.out.println("刚刚好");
                    // 画 除了最后一行的前几行
                    String substring = subWords.substring(0, count);
                    g.drawString(substring, (1360-width)/2, 215 + (b * height));
                    subWords = subWords.substring(count);
                    b++;
                    width = 0;
                    count = 0;
                }
                // 画 最后一行字符串
                if (i == total - 1) {
                    g.drawString(subWords,  (1360-width)/2, 215 + (b * height));
                }

            }
            /**
             * 换行算法结束
             */
            /**
             * 对于content的换行换行算法
             */
//            FontDesignMetrics metrics = FontDesignMetrics.getMetrics(textfont);
            // 获取字符的最高的高度
//            int height = metrics.getHeight();
//
            int totalcase = content.length();

            int width1 = 0;
            int count1 = 0;
            int total1 = content.length();
            String subWords1 = content;
            int b1 = 0;
            for (int i = 0; i < total1; i++) {
                // 统计字符串宽度 并与 预设好的宽度 作比较
                if (width1 <= 2300) {
//                    System.out.println("宽啦");
                    width1 += metrics.charWidth(content.charAt(i)); // 获取每个字符的宽度
                    count1++;
                } else {
//                    System.out.println("刚刚好");
                    // 画 除了最后一行的前几行
                    String substring = subWords1.substring(0, count1);
                    c.drawString(substring, (2600 - width1) / 2, 300 + (b * height) + (b1 * 60));
                    subWords1 = subWords1.substring(count1);
                    b1++;
                    width1 = 0;
                    count1 = 0;
                }
                // 画 最后一行字符串
                if (i == total1 - 1) {
                    int contentWidth1 = getWordWidth(contentfont, subWords1);
                    c.drawString(subWords1, (1360 - contentWidth1) / 2, 300 + (b * height) + (b1 * 60));
                }


            }
//            g.drawString(text, (1360-textWidth)/2, 215);
//            c.drawString(content, (1360-contentWidth)/2, 295 + (b1 * height));

//            g.dispose();
//            ByteArrayOutputStream bs = new ByteArrayOutputStream();
//            ImageOutputStream imOut;
//            imOut = ImageIO.createImageOutputStream(bs);
//
            File outFile = new File("temp.png");
            ImageIO.write(bufferedImage, "png", outFile);
//            ImageIO.write(bufferedImage, "jpeg", new File("/Users/macbook/Desktop/5.jpeg"));

            System.out.println(outFile);
            return outFile;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }


}
