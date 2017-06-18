package com.template.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class DateUtil {
	/**
	 * 获取当前日期
	 * 
	 * @return a {@link Date} with h,m,s,ms
	 */
	public static java.sql.Date getCurrentDateTime() {
		Calendar calendar = Calendar.getInstance();
		return new java.sql.Date(calendar.getTimeInMillis());
	}

	/**
	 * 获取当前日期，没有时分秒信息
	 * 
	 * @return a {@link Date} with no h,m,s,ms
	 */
	public static java.sql.Date getCurrentDate() {
		Calendar calendar = Calendar.getInstance();
		clearHMS(calendar);
		return new java.sql.Date(calendar.getTimeInMillis());
	}

	/**
	 * 格式化日期，默认的格式为 <code>yyyy-MM-dd HH:mm:ss</code>
	 * 
	 * @param date
	 * @return
	 */
	public static String formatDateTime(Date date) {
		return formatDate(date, "yyyy-MM-dd HH:mm:ss");
	}

	/**
	 * 格式化日期，默认的格式为 <code>yyyy-MM-dd</code>
	 * 
	 * @param date
	 * @return
	 */
	public static String formatDate(Date date) {
		return formatDate(date, "yyyy-MM-dd");
	}

	/**
	 * 格式化日期
	 * 
	 * @param date
	 * @param format
	 * @return
	 */
	public static String formatDate(Date date, String format) {
		SimpleDateFormat sdf = new SimpleDateFormat(format);
		return sdf.format(date);
	}

	/**
	 * 使用默认的格式解析字符串，默认的格式是：<code>yyyy-MM-dd HH:mm:ss</code>
	 * 
	 * @param dateString
	 * @return {@link Date}
	 * @throws ParseException
	 */
	public static Date parseDateTime(String dateString) throws ParseException {
		return parseDate(dateString, "yyyy-MM-dd HH:mm:ss");
	}

	/**
	 * 使用指定的格式解析字符串
	 * 
	 * @param dateString
	 * @param format
	 *            指定的格式
	 * @return {@link Date}
	 * @throws ParseException
	 */
	public static Date parseDate(String dateString, String format)
			throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat(format);
		java.util.Date d = sdf.parse(dateString);
		return new Date(d.getTime());
	}

	/**
	 * 对指定的日期字段进行加或者减操作
	 * 
	 * @param date
	 * @param field
	 *            see {@link Calendar}'s fields
	 * @param amount
	 *            要加减的数量
	 * @return 返回一个新的 {@link Date} 实例
	 */
	public static Date add(Date date, int field, int amount) {
		Calendar cal = Calendar.getInstance();
		cal.setTimeInMillis(date.getTime());
		cal.add(field, amount);
		return new Date(cal.getTimeInMillis());
	}

	/**
	 * 设置日期的时分秒及毫秒数均为0
	 * 
	 * @param cal
	 */
	public static void clearHMS(Calendar cal) {
		cal.set(Calendar.HOUR_OF_DAY, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		cal.set(Calendar.MILLISECOND, 0);
	}

	/**
	 * 设置日期的时分秒及毫秒数均为0
	 * 
	 * @param date
	 * @return 返回一个新的 {@link Date} 实例，此日期为一天中最小的时间
	 */
	public static Date clearHMS(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTimeInMillis(date.getTime());
		clearHMS(cal);
		return new Date(cal.getTimeInMillis());
	}

	/**
	 * 设置日期的时为23，分为59，秒为29，毫秒数为999
	 * 
	 * @param date
	 * @return 返回一个新的 {@link Date} 实例，此日期为一天中最大的时间
	 */
	public static Date addFullHMS(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTimeInMillis(date.getTime());
		cal.set(Calendar.HOUR_OF_DAY, 23);
		cal.set(Calendar.MINUTE, 59);
		cal.set(Calendar.SECOND, 59);
		cal.set(Calendar.MILLISECOND, 999);
		return new Date(cal.getTimeInMillis());
	}
}
