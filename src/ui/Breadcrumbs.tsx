import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import { IoIosArrowForward } from "react-icons/io";

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

interface Breadcrumb {
  label: string;
  link?: string; 
  isCurrent?: boolean; 
}

interface BreadCrumbsProps {
  breadcrumbs?: Breadcrumb[];
}

export default function BreadCrumbs({ breadcrumbs }: BreadCrumbsProps) {
  return (
    <Stack spacing={2}>
      <Breadcrumbs
     
        separator={<IoIosArrowForward fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs?.map((breadcrumb, index) => 
          breadcrumb.isCurrent ? (
            <Typography key={index} sx={{ color: "#E87B22" }}>
              {breadcrumb.label}
            </Typography>
          ) : (
            <Link
              key={index}
              underline="hover"
              color="inherit"
              href={breadcrumb.link}
              onClick={handleClick}
            >
              {breadcrumb.label}
            </Link>
          )
        )}
      </Breadcrumbs>
    </Stack>
  );
}

