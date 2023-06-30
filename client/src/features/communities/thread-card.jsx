import React from "react";
import {Link, useLoaderData, useParams} from "react-router-dom";
import {Container, Box, Icon, VStack, StackDivider} from "@chakra-ui/react";
import {BiSolidDownArrowSquare, BiSolidUpArrowSquare} from "react-icons/bi";
export default function Thread({thread}) {
  function formatDate(dateString) {
    let inputDate = Date.parse(dateString);
    const date = new Date(inputDate);

    return (
      date.getHours() + ":" + date.getMinutes() + ", " + date.toDateString()
    );
  }
  return (
    <div className="mt-4 p-2 border-2 flex max-h-22">
      <div className="flex flex-col">
        {/* <div></div>
                <div>comments</div>
                <div>downarrow</div> */}
        <div className="align-middle justify-center">
          <div>
            <Icon as={BiSolidUpArrowSquare} h={6} w={6} />
          </div>
          <div className="text-center">{thread.likes}</div>
          <div>
            <Icon as={BiSolidDownArrowSquare} h={6} w={6} />
          </div>
        </div>
      </div>
      <div className="flex flex-col ml-8 justify-center">
        <div className="text-2xl">{thread.title}</div>
        <span className="text-sm text-playstation_blue">
          Started on {formatDate(thread.created_at)}
        </span>
      </div>
    </div>
  );
}
