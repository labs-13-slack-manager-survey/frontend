import React from "react";
import ManagerFeedBackForUsers from "./ManagerFeedBackForUsers";
const ConfirmResponse = ({
  filteredResponse,
  seeManagerQ,
  toggleManagerQ,
  managerPollDays,
  managerResponsesAnswered
}) => {
  return (
    <div className="confirm-response">
      {/* renders if user has responded to it today or if manager has not responded to the manager questions yet */}
      {!managerResponsesAnswered || filteredResponse.length > 0 ? (
        <div>
          {filteredResponse.length > 0
            ? "Your response has been recorded"
            : "Poll unavailable: No manager response has been recorded for today"}{" "}
        </div>
      ) : (
        <ManagerFeedBackForUsers
          toggleManagerQ={toggleManagerQ}
          seeManagerQ={seeManagerQ}
          managerPollDays={managerPollDays}
        />
      )}
    </div>
  );
};

export default ConfirmResponse;
