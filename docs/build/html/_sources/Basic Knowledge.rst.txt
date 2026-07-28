.. _basic_knowledge:

Basic Knowledge
===============

.. tip::

   If you already know these basics, or you want to get the car moving first
   and learn the details later, you can skip this chapter and go directly to
   :doc:`Programming Examples <Upload Code/Programming Examples>`.

Welcome, Young Engineer!
------------------------

This chapter explains the basic knowledge used in this tutorial, including
how the car gets power, reads sensors, moves, and follows a program.

Think of the smart car as a tiny robot:

* The **micro:bit** is its brain.
* The **sensors** are its eyes and ears.
* The **motors and servo** are its hands and feet.
* The **lights and buzzer** help it show and tell you what it is doing.
* The **program** is the list of instructions it follows.
* The **battery** gives every part the energy to work.

.. tip::

   Build and test one small idea at a time. Making mistakes is a normal part
   of learning to program.

1. Electricity: The Robot's Energy
----------------------------------

Electricity gives the car energy. It moves through a complete path called a
**circuit**. A circuit is like a racetrack: if an important connection is
broken, electricity cannot reach the part that needs it, so that part will
not work.

The most useful power words are:

.. list-table::
   :header-rows: 1
   :widths: 20 30 50

   * - Word
     - Simple meaning
     - Think of it like...
   * - Voltage (V)
     - The push that moves electricity
     - Water pressure in a hose
   * - Current (A)
     - How much electricity is flowing
     - The amount of water flowing
   * - Power (W)
     - How quickly electrical energy is being used
     - How hard a machine is working
   * - GND
     - The common return path in a circuit
     - The road that leads electricity back

This car needs **3.5 V to 5 V DC**. You can use three AAA dry-cell batteries
or the supported 3.6 V to 3.7 V lithium-battery supply described in this
tutorial. Do not connect a higher-voltage battery just to make the car faster.
Too much voltage can damage the electronics.

.. important::

   The kit includes a three-AAA battery box and an infrared remote control,
   but the **batteries and micro:bit board are not included**. They need to be
   prepared separately.

   A USB cable can power the micro:bit while you download code, but it does
   not provide enough power for the whole car and its motors. Use the car's
   battery supply when you test driving and other peripherals.

.. warning::

   * Ask an adult for help if a battery becomes hot, leaks, swells, smells
     strange, or looks damaged.
   * Never join the positive and negative battery ends directly with metal.
     This is called a **short circuit** and it can make the battery and wire
     very hot.
   * Switch off the car before plugging in or unplugging parts.

**Quick check:** If nothing turns on, first check the power switch, the battery
direction, and whether every power plug is firmly connected.

2. Meet the micro:bit
---------------------

The micro:bit is a small computer. It can read information, make decisions,
and send commands to the car.

It has useful parts built in:

* A **5 x 5 LED display** that can show pictures, letters, and numbers.
* **Buttons A and B** that your program can read.
* A light-sensing function that can measure the light level.
* **Pins** that let it communicate with the car board and other parts.

A simple car program often works like this:

#. Read an input, such as a button or sensor.
#. Follow the rules in the program.
#. Create an output, such as moving a motor or lighting an LED.

For example, a line-following program can work like this:

``sensor detects the line`` -> ``program makes a decision`` -> ``motors adjust direction``

.. note::

   A micro:bit does not guess what you mean. It follows the instructions you
   give it, in the order and conditions written in the program.

3. MakeCode and Block Programming
---------------------------------

**MakeCode** is the programming website used in this tutorial. Its colored
blocks fit together like puzzle pieces. The shape of a block helps show where
it belongs.

Common block groups and tools include:

.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - Block group
     - What it is used for
   * - Basic
     - Show numbers, pictures, and text on the LED display
   * - Input
     - Read buttons, pins, light level, and other inputs
   * - Music
     - Play tones and melodies
   * - Loops
     - Repeat instructions
   * - Logic
     - Make choices using ``if`` and comparisons
   * - Variables
     - Remember information that may change
   * - Extensions
     - Add special block groups for extra hardware, such as this car

Two blocks are especially important:

``on start``
   Runs once when the micro:bit starts or is reset. Use it to prepare the car,
   set starting values, or show a welcome icon.

``forever``
   Repeats the blocks inside it again and again while the micro:bit has power.
   Use it when the car must keep checking a sensor.

**Mini example:** Put ``show icon`` inside ``on start``. The micro:bit draws
the icon once when the program begins, and it stays there until other code
changes the display. Put it inside ``forever`` and the micro:bit keeps drawing
it repeatedly, even if it looks unchanged.

4. Downloading: Sending the Program to the Robot
------------------------------------------------

MakeCode translates your blocks into a program that the micro:bit can
understand. If you download the program as a file, it is saved as a ``.hex``
file. You can copy this file to the ``MICROBIT`` drive. If you use a paired
direct download, MakeCode sends the program to the micro:bit for you.

A file download follows this journey:

``MakeCode blocks`` -> ``.hex file`` -> ``MICROBIT drive`` -> ``micro:bit runs the program``

Wait until the program transfer finishes before unplugging the USB cable.

.. tip::

   Giving each project a clear name, such as ``Motor-Test`` or
   ``Ultrasonic-Distance``, makes it easier to find later.

5. Input, Decision, and Output
------------------------------

Most robot programs can be understood as three steps:

.. list-table::
   :header-rows: 1
   :widths: 20 40 40

   * - Step
     - What happens
     - Car example
   * - Input
     - The robot receives information
     - The ultrasonic sensor measures a distance
   * - Decision
     - The program checks a rule
     - Is the distance below the chosen limit?
   * - Output
     - The robot does something
     - Change the car's direction

In block code, an ``if`` block lets the robot make a choice:

.. code-block:: text

   IF distance is below the chosen limit
       stop and turn
   ELSE
       move forward

The robot is not frightened by the obstacle. It is simply following the rule
you wrote.

6. Loops, Variables, and Conditions
-----------------------------------

These three ideas are used in many programs:

Loop
   A loop repeats instructions. ``forever`` is a loop that keeps going until
   the micro:bit is switched off or reset.

Variable
   A variable is a named box that remembers a value. A variable called
   ``distance`` can remember the latest reading from the ultrasonic sensor.

Condition
   A condition is a question with only two answers: **true** or **false**.
   For example, ``distance < limit`` is true when the measured distance is
   below the chosen limit.

.. code-block:: text

   FOREVER
       set distance to the sensor reading
       IF distance is below the chosen limit
           stop
       ELSE
           move forward

This loop helps the car react when the world around it changes.

7. Motors: How the Car Moves
----------------------------

The car has two N20 geared motors: one drives the left wheel and one drives
the right wheel. The program controls each motor's direction and speed.

.. list-table::
   :header-rows: 1
   :widths: 30 35 35

   * - Car action
     - Left motor
     - Right motor
   * - Move forward
     - Forward
     - Forward
   * - Move backward
     - Backward
     - Backward
   * - Turn left
     - Slower or backward
     - Faster or forward
   * - Turn right
     - Faster or forward
     - Slower or backward
   * - Stop
     - Stop
     - Stop

Motor speed is controlled using **PWM**. PWM switches power on and off very
quickly. More “on time” gives the motor more average power, so it usually spins
faster. It happens too quickly for your eyes to see.

The car may move more slowly when it is carrying a load. Two motors may not
spin at exactly the same speed, even when their code values match. The battery
level, floor, wheel fit, and small differences between motors can change how
the car moves. Adjust the left or right speed a little if the car does not
travel straight.

.. warning::

   If a wheel is stuck, stop the motor before touching it. Do not hold a
   powered wheel still with your fingers.

8. Servo: A Motor That Points
-----------------------------

A normal wheel motor keeps spinning. A **servo** is different: it moves its
shaft to a requested angle and tries to hold that position.

The car board has three servo ports, named **S1**, **S2**, and **S3**. The kit
includes one SG90 servo. The servo used with the forklift can raise, lower, or
position a moving part. Its safe movement range depends on how it is installed.
Do not force it past a physical stop. If it buzzes, shakes, or cannot reach the
requested angle, switch off the power and check the assembly and angle
settings.

9. Sensors: How the Car Notices the World
-----------------------------------------

A sensor changes something in the real world into a value the program can
read.

Ultrasonic sensor
~~~~~~~~~~~~~~~~~

The ultrasonic sensor measures distance using sound that is too high for
people to hear. It sends a short sound pulse and listens for the echo. A quick
echo means an object is nearby; a later echo means it is farther away.

It works a little like calling “hello” in a cave and listening for the echo.
Soft cloth, angled surfaces, very small objects, and moving objects can make
the reading less steady.

.. important::

   The kit can be built in different forms. The forklift assembly and the
   ultrasonic module use the same front area, so they cannot be installed
   there at the same time. Remove the forklift assembly before changing to
   the ultrasonic form. The shovel also blocks access to the ultrasonic and
   I2C area.

Infrared line sensors
~~~~~~~~~~~~~~~~~~~~~

The two line sensors under the car shine infrared light toward the floor and
measure the reflected light. Light and dark surfaces reflect different
amounts, so the program can tell when a sensor is over a dark line.

For best results:

* Use a clear dark line on a light, plain surface.
* Keep strong sunlight away from the sensors when possible.
* Test whether the sensors detect the line correctly before trying to drive
  quickly.
* If detection is unstable, carefully adjust the blue potentiometer on the
  car board to change the sensors' sensitivity.

Micro:bit light sensing
~~~~~~~~~~~~~~~~~~~~~~~

The micro:bit can estimate the light level using its LED display. A program
can compare that value with a chosen number and make the car react to brighter
or darker light.

Sensor readings are not magic “yes” or “no” answers. They are measurements.
Your program chooses a **threshold**, which is the dividing value between two
actions.

Infrared remote control
~~~~~~~~~~~~~~~~~~~~~~~

The car board has an infrared receiver, and the kit includes a handheld
infrared remote control. Batteries are not included. When you press a button,
the remote flashes a coded pattern of infrared light. People cannot see this
light, but the receiver can read it. The program connects each button signal
to an action such as moving, turning, or stopping.

Point the remote toward the receiver on the front of the car. A wall, a long
distance, or very strong sunlight may make the signal harder to receive.

10. LEDs, RGB Colors, and the Buzzer
------------------------------------

An **LED** is a small light that uses electricity efficiently. An **RGB LED**
contains red, green, and blue light sources. A program can control their
brightness to produce different colors.

The car has two different groups of colorful lights:

* Two RGB spotlights at the front work like colorful searchlights.
* Four WS2812 RGB LEDs on the bottom can be controlled one at a time. This is
  how the program creates running-light and breathing-light patterns.

The passive **buzzer** on the car board changes electrical signals into sound.
Higher-frequency signals make higher notes, and lower-frequency signals make
lower notes. The car board also has an audio switch. If your program is playing
notes but the buzzer is silent, check the position of this switch.

11. Pins and Ports: Where Signals Travel
----------------------------------------

Pins and ports are connection points. They carry power or signals between the
micro:bit, the car board, and connected parts.

You may see these labels:

.. list-table::
   :header-rows: 1
   :widths: 20 80

   * - Label
     - Meaning
   * - P0, P1, P2
     - General micro:bit signal pins used by a program
   * - GND
     - The common electrical return connection
   * - 3V3 (3.3 V) or 5V
     - Different power connections; the number tells you the voltage
   * - S1, S2, S3
     - Ports intended for servo control
   * - I2C
     - A communication system that uses two signal lines, called SDA and SCL,
       to talk to compatible electronic parts

Always match the plug, port, direction, and voltage shown in the tutorial.
**3V3 and 5V are not interchangeable.** Never move a plug to a different port
just because it fits.

12. A Safe Way to Test Every Project
------------------------------------

Use this short routine whenever you try new code:

#. **Check the build.** Are the wheels free to turn? Are the plugs in the
   correct ports?
#. **Lift the driving wheels.** For the first motor test, keep them off the
   table so the car cannot race away.
#. **Start small.** Test one light, motor, or sensor before combining many
   parts.
#. **Use a slow speed.** Increase it only after the direction is correct.
#. **Watch and listen.** Stop if a part becomes hot, smells strange, jams, or
   makes an unusual sound.
#. **Change one thing.** Run the test again so you know what caused the new
   result.

13. When It Does Not Work: Be a Code Detective
-----------------------------------------------

Do not change everything at once. Ask these questions in order:

#. **Power:** Is the switch on? Do the batteries have enough power, and are
   they facing the right way?
#. **Program:** Did the ``.hex`` file finish copying to the micro:bit?
#. **Connection:** Is each plug fully inserted into the correct port?
#. **Start block:** Is the important code inside ``on start``, ``forever``, or
   the correct event?
#. **Value:** Is a speed set to zero? Is a distance or angle value sensible?
#. **Direction:** Is a motor or sensor connected in the expected direction?
#. **One-part test:** Does the part work in a tiny program by itself?

Use the micro:bit display as a detective tool. Show a number, icon, or letter
at important points in your program. If the symbol appears, you know the
program reached that point.

14. Tiny Dictionary
-------------------

.. glossary::

   Algorithm
      A clear set of steps used to complete a task.

   Bug
      A mistake in a program or setup that causes an unexpected result.

   Code
      Instructions written for a computer.

   Debug
      To find and fix the cause of a problem.

   Hardware
      Physical parts you can touch, such as the micro:bit, motor, and sensor.

   Program
      A complete set of code that a computer can run.

   Reset
      To make the micro:bit stop the current run and start its program again.

   Sensor
      A part that measures something and sends a value to the program.

   Software
      Programs and digital tools, such as MakeCode.

   Threshold
      A chosen dividing value used to decide between two actions.

You are now ready to try the **Programming Examples**. Start with motor control
or lights, then move on to sensor projects when those first tests work.
