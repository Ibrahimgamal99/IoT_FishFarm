#include <OneWire.h>
#include <DallasTemperature.h>
float calibration = 24.54; //change this value to calibrate

#define ONE_WIRE_BUS 2    // Data wire is plugged into digital pin 2 on the Arduino

OneWire oneWire(ONE_WIRE_BUS);   // Setup a oneWire instance to communicate with any OneWire device
DallasTemperature sensors(&oneWire); // Pass oneWire reference to DallasTemperature library
const int analogInPin = A0;
int sensorValue = 0;
unsigned long int avgValue;
float b;
int buf[10], temp;
void setup() {
  sensors.begin();  // Start up the library
  Serial.begin(9600);
}

void loop() {

  sensors.requestTemperatures();      // Send the command to get temperatures
  for (int i = 0; i < 10; i++)
  {
    buf[i] = analogRead(analogInPin);
    delay(30);
  }
  for (int i = 0; i < 9; i++)
  {
    for (int j = i + 1; j < 10; j++)
    {
      if (buf[i] > buf[j])
      {
        temp = buf[i];
        buf[i] = buf[j];
        buf[j] = temp;
      }
    }
  }
  avgValue = 0;
  for (int i = 2; i < 8; i++)
    avgValue += buf[i];
  float pHVol = (float)avgValue * 5.0 / 1024 / 6;
  float phValue = -5.70 * pHVol + calibration;
  Serial.println(sensors.getTempCByIndex(0));
  Serial.println(phValue);
  delay(5000);
}
