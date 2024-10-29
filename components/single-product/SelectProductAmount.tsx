import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export enum Mode {
  SingleProduct = 'singleProduct',
  CartItem = 'cartItem',
}

type SelectProductAmountProps = {
  mode: Mode.SingleProduct;
  amount: number;
  setAmount: (value: number) => void;
};

type SelectCartItemAmountProps = {
  mode: Mode.CartItem;
  amount: number;
  setAmount: (value: number) => Promise<void>;
  isLoading: boolean;
};

function SelectProductAmount(props: SelectProductAmountProps | SelectCartItemAmountProps) {
  const { amount, mode, setAmount } = props;

  const cartItem = mode === Mode.CartItem;

  return (
    <>
      <h4 className='mb-2'>Amount : </h4>
      <Select
        defaultValue={amount.toString()}
        onValueChange={(value) => setAmount(Number(value))}
        disabled={cartItem ? props.isLoading : false}
      >
        <SelectTrigger className={cartItem ? 'w-[100px]' : 'w-[150px]'}>
          <SelectValue placeholder={amount} />
        </SelectTrigger>

        <SelectContent>
          {
            Array.from({ length: cartItem ? amount + 10 : 10 }, (_, i) => {
              const selectValue = String(i + 1);
              return (
                <SelectItem key={selectValue} value={selectValue} >
                  {selectValue}
                </SelectItem>
              );
            })
          }
        </SelectContent>
      </Select>
    </>
  );
}

export default SelectProductAmount;