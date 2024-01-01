package com.moneymanager.backend.form;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Summary {
    private double totalExpenses;
    private double totalEarnings;
    private double totalSavings;
}
