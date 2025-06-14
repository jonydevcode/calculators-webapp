import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { IconCar, IconBuildings, IconBuildingWarehouse, IconSchool } from "@tabler/icons-react";
import { useState, type ChangeEvent } from "react";

const TEMPLATES = {
  car: {
    principal: 250000,
    interestRatePercent: 2.8,
    loanTerm: 10,
  },
  condo: {
    principal: 1800000,
    interestRatePercent: 2.4,
    loanTerm: 30,
  },
  hdb: {
    principal: 500000,
    interestRatePercent: 2.6,
    loanTerm: 25,
  },
  university: {
    principal: 30000,
    interestRatePercent: 4,
    loanTerm: 10,
  },
} as const;

type TemplateName = keyof typeof TEMPLATES;

function calculateMonthlyRepayment(
  principal: number,
  interestRatePercent: number,
  loanTerm: number
) {
  const monthlyRate = interestRatePercent / 100 / 12;
  const numPayments = loanTerm * 12;

  let monthlyRepayment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numPayments));

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

  const monthlyRepayment = calculateMonthlyRepayment(principal, interestRatePercent, loanTerm);

  const handlePrincipalChanged = function (event: ChangeEvent<HTMLInputElement>) {
    setPrincipal(Number(event.target.value));
  };

  const handleInterestRateInputChanged = function (event: ChangeEvent<HTMLInputElement>) {
    setInterestRatePercent(Number(event.target.value));
  };

  const handleInterestRateSliderChanged = function (value: number[]) {
    setInterestRatePercent(value[0]);
  };

  const handleLoanTermChanged = function (event: ChangeEvent<HTMLInputElement>) {
    setLoanTerm(Number(event.target.value));
  };

  const handleLoanTermSliderChanged = function (value: number[]) {
    setLoanTerm(value[0]);
  };

  const handleBtnTemplateClicked = function (templateName: TemplateName) {
    const { principal, interestRatePercent, loanTerm } = TEMPLATES[templateName];
    setPrincipal(principal);
    setInterestRatePercent(interestRatePercent);
    setLoanTerm(loanTerm);
  };

  return (
    <div className="flex flex-col gap-2">
      <h1>Monthly Repayment Calculator</h1>
      <div className="flex gap-3">
        <Button variant="outline" size="lg" onClick={() => handleBtnTemplateClicked("car")}>
          <IconCar /> Car
        </Button>
        <Button variant="outline" size="lg" onClick={() => handleBtnTemplateClicked("condo")}>
          <IconBuildings /> Condo
        </Button>
        <Button variant="outline" size="lg" onClick={() => handleBtnTemplateClicked("hdb")}>
          <IconBuildingWarehouse /> HDB
        </Button>
        <Button variant="outline" size="lg" onClick={() => handleBtnTemplateClicked("university")}>
          <IconSchool /> University
        </Button>
      </div>
      <Separator className="my-2" />
      <div>
        <Label htmlFor="principal" className="my-2">
          Principal / Loan Amount
        </Label>
        <Input
          type="number"
          id="principal"
          placeholder="$"
          value={principal}
          onChange={handlePrincipalChanged}
        />
      </div>
      <div>
        <Label htmlFor="interest-rate" className="my-2">
          Interest Rate (%)
        </Label>
        <div className="flex gap-5">
          <Input
            type="number"
            id="interest-rate"
            placeholder="%"
            className="relative w-1/3"
            value={interestRatePercent}
            onChange={handleInterestRateInputChanged}
          />
          <Slider
            min={0}
            max={20}
            step={0.1}
            className=""
            value={[interestRatePercent]}
            onValueChange={handleInterestRateSliderChanged}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="loan-term" className="my-2">
          Loan Term (Years)
        </Label>
        <div className="flex gap-5">
          <Input
            type="number"
            id="loan-term"
            placeholder="Years"
            className="relative w-1/3"
            value={loanTerm}
            onChange={handleLoanTermChanged}
          />
          <Slider
            value={[loanTerm]}
            min={1}
            max={50}
            step={1}
            className=""
            onValueChange={handleLoanTermSliderChanged}
          />
        </div>
      </div>
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
