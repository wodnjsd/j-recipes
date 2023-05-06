import React from "react";
import Select from "react-select";
import prisma from "@/prisma/client";
import { useState } from "react";

const measurement = ({amountsList}) => {

  const [amount, setAmount] = useState("")
  return (
    <div>
      Please add the measurements for your ingredients!
      <table>
        <thead>
          <tr>
            <th>Ingredient</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {recipe.ingredients.map((ingredient) => {
            return (
              <tr>
                <td>{ingredient.title}</td>
                <td>
                  <Select
                    defaultValue={[]}
                    options={amountsList}
                    onChange={(amount) =>
                      setAmount(amount)
                    }
                    value={amount}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default measurement;

export async function getStaticProps() {
  const amounts = await prisma.amount.findMany()
  const amountsList = amounts.map((label) => ({
    value: label.title,
    label: label.title,
  }));
  return {
    props: {amountsList}
  }
}