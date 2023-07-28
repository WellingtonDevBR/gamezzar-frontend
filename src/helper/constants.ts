export const BASE_URL_LOCAL = "http://localhost:8000";
export const BASE_URL_PROD = "http://18.119.142.177:8000";
export const S3_BASE_URL = "https://gamezzar-images.s3.us-east-2.amazonaws.com";

export const dispositionMapping = (index) => {
  index = parseInt(index);
  if (index == 0) return 0;
  if (index >= 1 && index <= 2) return 1;
  if (index == 3) return 2;
  if (index == 4) return 3;
  if (index == 5) return 4;
  if (index == 6) return 5;
};

export const satisfactionMapping = (index) => {
  index = parseInt(index);
  if (index <= 1) return 0;
  if (index <= 3) return 1;
  if (index == 4) return 2;
  if (index <= 6) return 3;
  if (index <= 8) return 4;
  if (index == 9) return 5;
};

export const manualConditionMapping = (index) => {
  index = parseInt(index);
  if (index == 0) return 0;
  if (index == 1) return 1;
  if (index >= 2 && index <= 3) return 2;
  if (index >= 4 && index <= 5) return 3;
  if (index >= 6 && index < 7) return 4;
  if (index == 7) return 5;
};

export const coverConditionMapping = (index) => {
  index = parseInt(index);
  if (index == 0) return 0;
  if (index == 1) return 1;
  if (index >= 2 && index <= 3) return 2;
  if (index == 4) return 3;
  if (index >= 5 && index <= 6) return 4;
  if (index == 7) return 5;
};

export const discConditionMapping = (index) => parseInt(index);
