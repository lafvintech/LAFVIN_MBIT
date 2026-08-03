.. __Basic Courses for Cars:

Basic Courses for Cars
========================   

1. N20 Motor Control
--------------------
Effect: The two N20 motors move the car forward, backward, turn left, turn right, rotate left and right, or stop. You can set the car's speed.

Effect demonstration:

.. figure:: ./img/电机控制G.gif
   :align: center
   :width: 80%

makecode program link: `https://makecode.microbit.org/S95796-94350-74983-15795 <https://makecode.microbit.org/S95796-94350-74983-15795/>`_

Screenshot of makecode graphical interface:

.. figure:: ./img/电机控制C.png
   :align: center
   :width: 80%

**Code analysis:**

* ``on start`` shows an icon once when the micro:bit starts.
* The blocks inside ``forever`` run from top to bottom and then start again.
* The car moves forward for 1 second, rotates left for 1 second, rotates right for 1 second, and moves backward for 1 second. Each movement uses speed 100.
* Finally, the car stops for 1 second. Then the whole sequence repeats.

2. Passive Buzzer Music
-----------------------
Effect: The passive buzzer on the Smart Car board can play a built-in melody.

makecode program link: `https://makecode.microbit.org/S93528-06251-15177-28056 <https://makecode.microbit.org/S93528-06251-15177-28056/>`_

Screenshot of makecode graphical interface:

.. figure:: ./img/音乐小车C.png
   :align: center
   :width: 80%

**Code analysis:**

* The blocks inside ``on start`` run once when the micro:bit starts.
* First, the micro:bit LED display shows an icon.
* Next, the car plays the built-in ``dadadum`` melody once.

3. Colored Searchlights
-----------------------
Effect: The two colored searchlights on the left and right sides always show
the same color together. Changing that shared color repeatedly creates a
flashing pattern.

Effect demonstration:

.. figure:: ./img/七彩探照灯G.gif
   :align: center
   :width: 80%

makecode program link: `https://makecode.microbit.org/S48161-29282-53225-53062 <https://makecode.microbit.org/S48161-29282-53225-53062/>`_

Screenshot of makecode graphical interface:

.. figure:: ./img/七彩探照灯C.png
   :align: center
   :width: 80%


**Code analysis:**

* ``on start`` shows an icon once.
* Inside ``forever``, both colored searchlights change together in this order:
  red, green, blue, white, cyan, pinkish, yellow, and off.
* A ``pause 500 ms`` block follows every color change, so each setting stays for half a second.
* After the lights turn off for half a second, the color sequence starts again.

4. WS2812 RGB Running Lights
----------------------------
Effect: The four WS2812 RGB lights on the bottom of the Smart Car board can show a running-light pattern.

Effect demonstration:

.. figure:: ./img/RGB跑马灯G.gif
   :align: center
   :width: 80%

makecode program link: `https://makecode.microbit.org/S23470-56019-18472-86312 <https://makecode.microbit.org/S23470-56019-18472-86312/>`_


Screenshot of makecode graphical interface:

.. figure:: ./img/RGB跑马灯C1.png
   :align: center
   :width: 100%
.. figure:: ./img/RGB跑马灯C2.png
   :align: center
   :width: 100%
.. figure:: ./img/RGB跑马灯C3.png
   :align: center
   :width: 100%

**Code analysis:**

* The four WS2812 RGB lights are numbered 0, 1, 2, and 3.
* Inside ``forever``, the program changes one numbered light at a time. It uses red, orange, yellow, and green first, followed by blue, indigo, violet, purple, and white as shown in the screenshots.
* ``RGB Lights show`` makes each new color setting appear on the real WS2812 RGB lights.
* After every ``show`` block, the program waits 500 milliseconds before changing the next light.
* When the last step is finished, the running-light sequence repeats.

5. WS2812 RGB Breathing Lights
------------------------------
Effect: The four WS2812 RGB lights on the bottom of the Smart Car board can show a breathing-light pattern.

Effect demonstration:

.. figure:: ./img/RGB呼吸灯G.gif
   :align: center
   :width: 80%

makecode program link: `https://makecode.microbit.org/S42098-98692-58148-98413 <https://makecode.microbit.org/S42098-98692-58148-98413/>`_

Screenshot of makecode graphical interface:

.. figure:: ./img/RGB呼吸灯C.png
   :align: center
   :width: 80%

**Code analysis:**

* At the start, the program shows an icon, sets the variable ``a`` to 0, and clears the WS2812 RGB lights.
* The first ``for`` loop changes ``a`` from 0 to 255. It uses ``a`` as the brightness, so the white lights gradually become brighter.
* The second ``for`` loop also changes ``a`` from 0 to 255, but it sets the brightness to ``255 - a``. This makes the white lights gradually become dimmer.
* Both loops are inside ``forever``, so the brighten-and-dim breathing effect repeats.

6. Light Tracking
-----------------
Effect: The micro:bit light sensor can control the N20-motor speed according to light level, creating a light-tracking effect.

Effect demonstration:

.. figure:: ./img/追光G.gif
   :align: center
   :width: 80%

makecode program link: `https://makecode.microbit.org/S14523-36545-26778-18250 <https://makecode.microbit.org/S14523-36545-26778-18250/>`_


Screenshot of makecode graphical interface:

.. figure:: ./img/追光C.png
   :align: center
   :width: 80%

**Code analysis:**

* ``light level`` is the brightness value measured by the micro:bit.
* The ``forever`` loop keeps checking this value.
* If the light level is 70 or more, the car moves forward. Its speed is set to the current light-level value.
* If the light level is below 70, the car stops.

7. Line Tracking
----------------
Effect: The two line-following sensors on the bottom of the Smart Car board detect the black line on the ground, so the program can adjust the car's direction.

Effect demonstration:

.. figure:: ./img/巡线G.gif
   :align: center
   :width: 80%

makecode program link: `https://makecode.microbit.org/S82467-65410-61513-88116 <https://makecode.microbit.org/S82467-65410-61513-88116/>`_


Screenshot of makecode graphical interface:

.. figure:: ./img/巡线C.png
   :align: center
   :width: 80%

**Code analysis:**

* The ``forever`` loop keeps reading the left and right line-following sensors.
* If both sensors detect white, the car moves forward at speed 45.
* If the left sensor detects white and the right sensor detects black, the car rotates right at speed 55.
* If the left sensor detects black and the right sensor detects white, the car rotates left at speed 55.
* For any other sensor result, the car stops.

8. HC-SR04 Ultrasonic Ranging
-----------------------------
Effect: The optional HC-SR04 ultrasonic module at the front of the Smart Car board measures the distance to obstacles and displays the result on the micro:bit LED display.

.. tip::  Before using the HC-SR04 ultrasonic module, switch to ultrasonic mode.

   .. image:: /Tutorial/img/安装超声波.jpg

Effect demonstration:

.. figure:: ./img/超声波测距G.gif
   :align: center
   :width: 80%

makecode program link: `https://makecode.microbit.org/S98856-20868-77452-43719 <https://makecode.microbit.org/S98856-20868-77452-43719/>`_


Screenshot of makecode graphical interface:

.. figure:: ./img/超声波测距C.png
   :align: center
   :width: 80%

**Code analysis:**

* The HC-SR04 ultrasonic-module block returns the measured distance in centimeters.
* The block is inside ``forever``, so the program measures again and again.
* Each measured distance is shown as a number on the micro:bit LED display.

9. HC-SR04 Ultrasonic Obstacle Avoidance
-----------------------------------------
Effect: The optional HC-SR04 ultrasonic module at the front of the Smart Car board measures the distance to obstacles, allowing the N20 motors to turn the car away.

Effect demonstration:

.. figure:: ./img/超声波避障G.gif
   :align: center
   :width: 80%

makecode program link: `https://makecode.microbit.org/S20248-94240-76314-39688 <https://makecode.microbit.org/S20248-94240-76314-39688/>`_


Screenshot of makecode graphical interface:

.. figure:: ./img/超声波避障C.png
   :align: center
   :width: 80%

**Code analysis:**

* The ``forever`` loop keeps measuring the distance in front of the car.
* If the distance is 13 cm or less, the car moves backward at speed 80 for 200 milliseconds. It then rotates right at speed 80 for 300 milliseconds.
* If the distance is greater than 13 cm, the car moves forward at speed 80.
* The test then repeats, allowing the car to react to a new distance reading.

10. HC-SR04 Ultrasonic Following
---------------------------------
Effect: The optional HC-SR04 ultrasonic module measures the distance to an object in front of the Smart Car board, allowing the N20 motors to create a following effect.

Effect demonstration:

.. figure:: ./img/超声波跟随G.gif
   :align: center
   :width: 80%

makecode program link: `https://makecode.microbit.org/S30884-31518-90039-02970 <https://makecode.microbit.org/S30884-31518-90039-02970/>`_


Screenshot of makecode graphical interface:

.. figure:: ./img/超声波跟随C.png
   :align: center
   :width: 80%

**Code analysis:**

* The program stores each HC-SR04 ultrasonic-module distance reading in the variable ``value``.
* If ``value`` is greater than 0 and less than 10, the car moves forward at speed 100 for 500 milliseconds.
* For every other value, the car stops.
* These blocks are inside ``forever``, so the distance is checked repeatedly.

11. SG90 Servo Drive
--------------------
Effect: Connect the SG90 servo to the servo interface to control its rotation angle through programming.

Effect demonstration:

.. figure:: ./img/舵机驱动G.gif
   :align: center
   :width: 80%

makecode program link: `https://makecode.microbit.org/S43067-53664-12051-64290 <https://makecode.microbit.org/S43067-53664-12051-64290/>`_


Screenshot of makecode graphical interface:

.. figure:: ./img/舵机驱动C.png
   :align: center
   :width: 80%


**Code analysis:**

* Pressing button A sets the SG90 servo at S1 to 0 degrees and shows ``0`` on the micro:bit LED display.
* Pressing button B sets the SG90 servo at S1 to 180 degrees and shows ``180`` on the micro:bit LED display.
* Pressing A and B together repeats the same SG90-servo swing 4 times: S1 goes to 0 degrees, waits 500 milliseconds, goes to 180 degrees, and waits another 500 milliseconds.


.. tip:: Because the basic, HC-SR04 ultrasonic, and forklift forms have different installation space, weight, and power needs, adjust the program when you change forms. You can also add compatible modules through the labelled interfaces.
