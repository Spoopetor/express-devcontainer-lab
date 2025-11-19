# Math API Documentation

This API allows the client to calculate the several math operations based on parameters.

## Calculate Circle
**Request Format:** `/math/circle/:r`

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Calculates the area and circumference of a circle with radius `r`.

**Example Request:** `/math/circle/2`

**Example Response:**
```json
{
  "area": 12.5663706143592,
  "circumference": 12.5663706143592
}
```

**Error Handling:**
- Possible 400 (invalid request) errors (all in JSON):
  - If `r` `{"error": "Invalid radius. Please provide numeric values."}`

## Notes:
- The `width` and `height` must be provided as part of the URL path.
- The `width` and `height` is expected to be numeric. Non-numeric values will result in an error.

## Calculate Circle
**Request Format:** `/math/rectangle/:w/:h`

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Calculates the area and perimeter of a radius with width `w` and height `h`.

**Example Request:** `/math/rectangle/5/5`

**Example Response:**
```json
{
  "area": 25,
  "perimeter": 20
}
```

**Error Handling:**
- Possible 400 (invalid request) errors (all in JSON):
  - If `width` or `height` `{"error": "Invalid width or height. Please provide numeric values."}`

## Notes:
- The `width` and `height` must be provided as part of the URL path.
- The `width` and `height` are expected to be numeric. Non-numeric values will result in an error.


## Calculate Power
**Request Format:** `/math/power/:base/:exponent`

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Calculates the result of raising a `base` number to an `exponent` power. Optionally, if a query parameter `root` is provided, the square root of the `base` will also be returned in the response.

**Example Request:** `/math/power/4/2`

**Example Response:**
```json
{
    "result": 16
}
```

**Example Request with Root:** `/math/power/9/2?root=true`

**Example Response with Root:**
```json
{
    "result": 81,
    "root": 3
}
```

**Error Handling:**
- Possible 400 (invalid request) errors (all in JSON):
  - If the `base` or `exponent` is not a valid number, returns an error with message `{"error": "Invalid base or exponent. Please provide numeric values."}`

## Notes:
- The `base` and `exponent` must be provided as part of the URL path.
- Both `base` and `exponent` are expected to be numeric. Non-numeric values will result in an error.
- The optional `root` query parameter does not require a value. Its presence in the request query indicates that the square root of the `base` should also be calculated and included in the response.
