package com.ttice.icewkment.Util;

import net.coobird.thumbnailator.Thumbnails;

import javax.imageio.ImageIO;
import javax.swing.*;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;


public class ImgGenerateUtils {

    //得到该字体字符串的长度
    public static int getWordWidth(Font font, String content) {
        FontMetrics fm = Toolkit.getDefaultToolkit().getFontMetrics(font);
        int width = 0;
        for (int i = 0; i < content.length(); i++) {
            width += SwingUtilities.computeStringWidth(fm, String.valueOf(i));
        }
        return width;
    }
    /**
     *  写文字
     */
    private File imgFiles;
    private static File outFiles;
    public static File ImgGenerate(File imgFiles , String title , String content) {
        try {
            //文件先用 BufferedImage 对象为其截取1360x544的大小
            BufferedImage bufferedImage = Thumbnails.of(imgFiles).size(1360, 544).keepAspectRatio(false).asBufferedImage();
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
            //定义字体
            Font textfont = FontUtil.getFont(FontUtil.FZLTTH_GBK_FONT, 94.0f);
            Font contentfont = FontUtil.getFont(FontUtil.FZLTTH_GBK_FONT, 44.0f);

            int textWidth = getWordWidth(textfont, title);
            int contentWidth = getWordWidth(contentfont, content);
            /**
             *  换行算法
             */
            FontMetrics fm = Toolkit.getDefaultToolkit().getFontMetrics(textfont);
            // 获取字符的最高的高度
            int height = fm.getHeight();
            int width = 0;
            int count = 0;
            int total = title.length();
            String subWords = title;
            int b = 0;
            for (int i = 0; i < total; i++) {
                // 统计字符串宽度 并与 预设好的宽度 作比较
                if (width <= 1200) {
                    width += SwingUtilities.computeStringWidth(fm, String.valueOf(i)); // 获取每个字符的宽度
                    count++;
                } else {
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
            //换行算法结束

            /**
             * 对于content的换行换行算法
             */
            // 获取字符的最高的高度
            int totalcase = content.length();

            int width1 = 0;
            int count1 = 0;
            int total1 = content.length();
            String subWords1 = content;
            int b1 = 0;
            for (int i = 0; i < total1; i++) {
                // 统计字符串宽度 并与 预设好的宽度 作比较
                if (width1 <= 2300) {
                    width1 += SwingUtilities.computeStringWidth(fm, String.valueOf(i)); // 获取每个字符的宽度
                    count1++;
                } else {
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

            File outFile = new File("temp.png");
            ImageIO.write(bufferedImage, "png", outFile);
            System.out.println(outFile);
            return outFile;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }


}
