import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  IconCar,
  IconBuildings,
  IconBuildingWarehouse,
  IconSchool,
} from "@tabler/icons-react";
import { useState } from "react";
import InputSlider from "./InputSlider";

const TEMPLATES = [
  {
    label: "Condo",
    icon: <IconBuildings />,
    principal: 1800000,
    interestRatePercent: 2.4,
    loanTerm: 30,
  },
  {
    label: "Car",
    icon: <IconCar />,
    principal: 250000,
    interestRatePercent: 2.8,
    loanTerm: 10,
  },
  {
    label: "HDB",
    icon: <IconBuildingWarehouse />,
    principal: 500000,
    interestRatePercent: 2.6,
    loanTerm: 25,
  },
  {
    label: "University",
    icon: <IconSchool />,
    principal: 30000,
    interestRatePercent: 4,
    loanTerm: 10,
  },
] as const;

interface CalcInputs {
  principal: number;
  interestRatePercent: number;
  loanTerm: number;
}

function calculateMonthlyRepayment({
  principal,
  interestRatePercent,
  loanTerm,
}: CalcInputs) {
  const monthlyRate = interestRatePercent / 100 / 12;
  const numPayments = loanTerm * 12;

  let monthlyRepayment =
    (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numPayments));

  if (monthlyRate === 0) monthlyRepayment = principal / numPayments;

  return monthlyRepayment;
}

function formatCurrency(
  amount: number,
  locale: string = "en-US",
  currency: string = "USD"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
}

export default function MonthlyRepaymentCalculator() {
  const [principal, setPrincipal] = useState<number>(100000);
  const [interestRatePercent, setInterestRatePercent] = useState<number>(3.5);
  const [loanTerm, setLoanTerm] = useState<number>(25);

  const monthlyRepayment = calculateMonthlyRepayment({
    principal,
    interestRatePercent,
    loanTerm,
  });

  const handlePrincipalChanged = function (value: number) {
    setPrincipal(value);
  };

  const handleInterestRateChanged = function (value: number) {
    setInterestRatePercent(value);
  };

  const handleLoanTermChanged = function (value: number) {
    setLoanTerm(value);
  };

  const useTemplate = function ({
    principal,
    interestRatePercent,
    loanTerm,
  }: CalcInputs) {
    setPrincipal(principal);
    setInterestRatePercent(interestRatePercent);
    setLoanTerm(loanTerm);
  };

  return (
    <div className="flex flex-col gap-2">
      <h1>Monthly Repayment Calculator</h1>
      <div className="flex flex-wrap gap-3">
        {TEMPLATES.map(({ label, icon, principal, interestRatePercent, loanTerm }) => (
          <Button
            key={label}
            variant="outline"
            size="lg"
            onClick={() => useTemplate({ principal, interestRatePercent, loanTerm })}
          >
            {icon} {label}
          </Button>
        ))}
      </div>
      <Separator className="my-2" />
      <InputSlider
        id="principal"
        label="Principal / Loan Amount"
        placeholder="$"
        value={principal}
        sliderMin={0}
        sliderMax={5000000}
        sliderStep={1000}
        onInputChange={handlePrincipalChanged}
        onSliderChange={handlePrincipalChanged}
      />
      <InputSlider
        id="interest-rate"
        label="Interest Rate (%)"
        placeholder="%"
        value={interestRatePercent}
        sliderMin={0}
        sliderMax={10}
        sliderStep={0.1}
        onInputChange={handleInterestRateChanged}
        onSliderChange={handleInterestRateChanged}
      />
      <InputSlider
        id="loan-term"
        label="Loan Term (Years)"
        placeholder="Years"
        value={loanTerm}
        sliderMin={1}
        sliderMax={50}
        sliderStep={1}
        onInputChange={handleLoanTermChanged}
        onSliderChange={handleLoanTermChanged}
      />
      <Separator className="my-4" />
      <div className="flex">
        <Label htmlFor="monthly-repayment" className="">
          Monthly Loan Repayment
        </Label>
        <div className="text-2xl px-4">{formatCurrency(monthlyRepayment)}</div>
      </div>
    </div>
  );
}
