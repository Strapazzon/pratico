import React from "react";

type CustomerEditPageProps = {
  params: {
    locale: string;
    customerId: string;
  };
};

const CustomerEditPage: React.FC<CustomerEditPageProps> = ({
  params: { customerId },
}) => {
  return (
    <div>
      <h1>Customers Page id: {customerId}</h1>
    </div>
  );
};

export default CustomerEditPage;
