import { ButtonLink } from "@/components/ButtonLink";
import { Heading } from "@/components/Heading";
import { Logo } from "@/components/Logo";
import Link from "next/link";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <div className="relative aspect-square shrink-0 bg-[#3a414a] lg:aspect-auto lg:grow">
        <div className="absolute inset-0"></div>
        <Link href="/" className="absolute left-6 top-6">
          <Logo className="h-12 text-white" />
        </Link>
      </div>
      <div className="grow bg-texture bg-zinc-900 text-white ~p-4/6 lg:w-96 lg:shrink-0 lg:grow-0">
        <Heading as="h1" size="sm" className="mb-6 mt-0">
          Build your board
        </Heading>
        <ButtonLink href="" color="lime" icon="plus">
          Add to cart
        </ButtonLink>
      </div>
    </div>
  );
};

export default page;
