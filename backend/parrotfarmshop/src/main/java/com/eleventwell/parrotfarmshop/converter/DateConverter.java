package com.eleventwell.parrotfarmshop.converter;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import java.text.SimpleDateFormat;
import java.util.Date;

@Converter(autoApply = true)
public class DateConverter implements AttributeConverter<Date, String> {
    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");

    @Override
    public String convertToDatabaseColumn(Date date) {
        return (date != null) ? dateFormat.format(date) : null;
    }

    @Override
    public Date convertToEntityAttribute(String dateStr) {
        try {
            return (dateStr != null) ? dateFormat.parse(dateStr) : null;
        } catch (Exception e) {
            // Handle parsing exceptions as needed
            return null;
        }
    }
}