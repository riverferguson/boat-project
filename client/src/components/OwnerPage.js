import React from "react";
import OwnerCard from "./OwnerCard";

const OwnerPage = ({ owners }) => {
  const mappedOwners = owners.map((owner) => (
    <OwnerCard key={owner.id} owner={owner} />
  ));

  return (
    <main>
      <h2>Members</h2>
      <div>{mappedOwners}</div>
    </main>
  );
};

export default OwnerPage;