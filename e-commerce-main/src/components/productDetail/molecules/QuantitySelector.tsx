import QuantityButton from "../atoms/QuantityButton";

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const QuantitySelector = ({
  quantity,
  onIncrease,
  onDecrease,
}: QuantitySelectorProps) => {
  return (
    <div className="flex items-center gap-2">
      <QuantityButton label="−" onClick={onDecrease} />
      <span className="text-lg font-medium w-6 text-center">{quantity}</span>
      <QuantityButton label="+" onClick={onIncrease} />
    </div>
  );
};

export default QuantitySelector;
