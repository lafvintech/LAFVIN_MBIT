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

Imagine:

* The **micro:bit** is the driver. It reads the controls and sensor values,
  makes choices, and sends commands to the other parts.
* The **micro:bit light sensor** is a brightness meter. It tells the driver whether the
  surroundings are bright enough to move toward the light.
* The two **line-following sensors** are downward-looking track eyes. They tell the
  driver whether the left and right sides are over black or white.
* The **HC-SR04 ultrasonic module** is a forward-looking measuring tape. It measures
  how far away an obstacle is so the car can avoid or follow it.
* The **infrared receiver** is the remote-control messenger. It tells the
  driver which remote button was pressed.
* The two **N20 motors** are the driving legs. They move the car forward or backward,
  turn it, spin it, and stop it.
* The **SG90 servo** is a movable joint. It turns the attached part to a chosen
  angle, such as ``0``, ``90``, or ``180`` degrees.
* The **LED display, colored searchlights, WS2812 RGB lights, and passive
  buzzer** are the car's
  display board and voice. They show icons, numbers, and colors or play notes
  and melodies.
* The **program** is the driver's task list. Events, loops, and conditions
  tell it when to read, decide, move, light up, or make a sound.
* The **battery** is the car's energy tank. It supplies the power needed by
  the micro:bit, Smart Car board, N20 motors, SG90 servo, colored
  searchlights, WS2812 RGB lights, and passive buzzer.

.. tip::

   Build and test one small idea at a time. Making mistakes is a normal part
   of learning to program.

1. Meet the micro:bit
---------------------

The micro:bit is a small computer. It can read information, make decisions,
and send commands to the car.

Start with the parts that appear in this tutorial:

.. figure:: ./basic_knowledge/img/microbit-front-labelled.svg
   :align: center
   :width: 100%
   :alt: Labelled front of a micro:bit V2

   Buttons A and B are inputs. The 5 x 5 LEDs show icons and
   numbers, and the display also measures the light level. The micro:bit
   slides into the Smart Car board's micro:bit connector.

.. note::

   The pictures show a **micro:bit V2**. A V1 board looks slightly different,
   but it has the same buttons, LED display, Micro-USB socket, reset button,
   and pins used in this tutorial.

2. From micro:bit Pins to Smart Car Board Interfaces
-----------------------------------------------------

The gold strips along the bottom of the micro:bit are the **gold contacts** of
its **edge connector**. Some contacts are connected to the micro:bit's
**pins**, which a program can use for signals, power, or ground. When you slide
the micro:bit into the **micro:bit connector** on the **Smart Car board**, the
gold contacts form the path that carries power and signals between the two
boards.

You do not need to memorize every pin. Start with the labels that appear in
this tutorial:

.. list-table::
   :header-rows: 1
   :widths: 24 76

   * - Label
     - What it means here
   * - P0, P1, P2
     - Signal pins exposed by the Smart Car board's **GPIO interface**
   * - P8
     - The micro:bit pin used by the Smart Car board's infrared receiver
   * - 3V3 (3.3 V)
     - The micro:bit's 3.3-volt power connection
   * - GND
     - The common electrical return connection
   * - S1, S2, S3
     - Positions on the Smart Car board's **servo interface**, used to carry
       power and a control signal to the SG90 servo
   * - I2C
     - Part of the **HC-SR04 and I2C interface** on the Smart Car board for
       compatible electronic parts that use the SDA and SCL signal lines

The micro:bit pins, the Smart Car board's **golden-finger expansion
interface**, and its labelled interfaces are related, but they are not the
same thing. The Smart Car board routes micro:bit signals to the N20 motors,
colored searchlights, WS2812 RGB lights, sensors, and interfaces.

.. important::

   Insert the micro:bit in the direction shown in the assembly instructions.
   Always match the plug, port, direction, and voltage shown in the tutorial.
   **3V3 and 5V are not interchangeable.**

3. Powering the Car Safely
--------------------------

The battery gives the car energy. Before switching it on, remember three
simple rules:

#. Put the batteries into the holder in the direction shown by the ``+`` and
   ``-`` marks.
#. Push each power plug fully into the correct **power interface**.
#. Use only the battery supply described in this tutorial.

This car needs **3.5 V to 5 V DC**. You can use three AAA dry-cell batteries
or the supported 3.6 V to 3.7 V lithium-battery supply described in this
tutorial. A higher-voltage battery will not simply make the car faster; it
can damage the electronics.

.. important::

   The kit includes a three-AAA battery box and an infrared remote control,
   but the **batteries and micro:bit are not included**. They need to be
   prepared separately.

   A USB cable can power the micro:bit while you download code, but it does
   not provide enough power for the whole car and its N20 motors. Use the
   Smart Car board's battery supply when you test driving and other peripherals.

.. warning::

   * Ask an adult for help if a battery becomes hot, leaks, swells, smells
     strange, or looks damaged.
   * Never join the positive and negative battery ends directly with metal.
     This is called a **short circuit** and it can make the battery and wire
     very hot.
   * Switch off the car before plugging in or unplugging parts.

**Quick check:** If nothing turns on, first check the **power switch**, the
battery direction, and whether the power plug is firmly connected to the
**power interface**.

4. Colored Searchlights, WS2812 RGB Lights, and the Passive Buzzer
-------------------------------------------------------------------

An **LED** is a small light that uses electricity efficiently. An **RGB LED**
contains red, green, and blue light sources. A program can control their
brightness to produce different colors.

The car has two different groups of colorful lights:

* Two **colored searchlights** at the front can show different colors.
* Four **WS2812 RGB lights** on the bottom can be controlled one at a time. This is
  how the program creates running-light and breathing-light patterns.

The **passive buzzer** on the Smart Car board changes electrical signals into sound.
Higher-frequency signals make higher notes, and lower-frequency signals make
lower notes. The Smart Car board also has an **audio switch**. If your program is
playing notes but the passive buzzer is silent, check the position of this switch.

5. N20 Motors: How the Car Moves
--------------------------------

The Smart Car board has two **N20 motors**: one drives the left wheel and one drives
the right wheel. The program controls each motor's direction and speed.

.. list-table::
   :header-rows: 1
   :widths: 30 35 35

   * - Car action
     - Left N20 motor
     - Right N20 motor
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

6. SG90 Servo: A Motor That Points
----------------------------------

A normal N20 motor keeps spinning. An **SG90 servo** is different: it moves its
shaft to a requested angle and tries to hold that position.

The Smart Car board's **servo interface** has three positions: **S1**, **S2**,
and **S3**. The SG90 servo used with the forklift can raise, lower, or position
a moving part. Its safe movement range depends on how it is installed. Do not
force it past a physical stop. If it buzzes, shakes, or cannot reach the
requested angle, switch off the power and check the assembly and angle settings.

7. Sensors: How the Car Notices the World
-----------------------------------------

A sensor changes something in the real world into a value the program can
read.

micro:bit light sensing
~~~~~~~~~~~~~~~~~~~~~~~

The micro:bit can estimate the light level using its LED display. A program
can compare that value with a chosen number and make the car react to brighter
or darker light.

Sensor readings are not magic “yes” or “no” answers. They are measurements.
Your program chooses a **threshold**, which is the dividing value between two
actions.

Infrared remote control
~~~~~~~~~~~~~~~~~~~~~~~

The Smart Car board has an **infrared receiver**, and the kit includes a handheld
infrared remote control. Batteries are not included. When you press a button,
the remote flashes a coded pattern of infrared light. People cannot see this
light, but the receiver can read it. The program connects each button signal
to an action such as moving, turning, or stopping.

Point the remote toward the receiver on the front of the car. A wall, a long
distance, or very strong sunlight may make the signal harder to receive.

Line-following sensors
~~~~~~~~~~~~~~~~~~~~~~

The two **line-following sensors** under the Smart Car board shine infrared light toward the floor and
measure the reflected light. Light and dark surfaces reflect different
amounts, so the program can tell when a sensor is over a dark line.

For best results:

* Use a clear dark line on a light, plain surface.
* Keep strong sunlight away from the sensors when possible.
* Test whether the sensors detect the line correctly before trying to drive
  quickly.
* If detection is unstable, carefully adjust the blue potentiometer on the
  Smart Car board to change the sensors' sensitivity.

HC-SR04 ultrasonic module
~~~~~~~~~~~~~~~~~~~~~~~~~

The **HC-SR04 ultrasonic module** measures distance using sound that is too high for
people to hear. It sends a short sound pulse and listens for the echo. A quick
echo means an object is nearby; a later echo means it is farther away.

It works a little like calling “hello” in a cave and listening for the echo.
Soft cloth, angled surfaces, very small objects, and moving objects can make
the reading less steady.

.. important::

   The kit can be built in different forms. The forklift assembly and the
   HC-SR04 ultrasonic module use the same front area, so they cannot be installed
   there at the same time. Remove the forklift assembly before changing to
   the ultrasonic form. The shovel also blocks access to the ultrasonic and
   I2C area.

8. Input, Decision, and Output
------------------------------

Now that you know the car's sensors and moving, lighting, and sound parts, you
can connect them with a program. Most robot programs can be understood as
three steps:

.. list-table::
   :header-rows: 1
   :widths: 20 40 40

   * - Step
     - What happens
     - Car example
   * - Input
     - The robot receives information
     - The micro:bit measures the light level
   * - Decision
     - The program checks a rule
     - Is the light level at or above the chosen limit?
   * - Output
     - The robot does something
     - The N20 motors move the car or stop it

The information follows this path:

``micro:bit light sensor`` -> ``program checks the light level`` -> ``N20 motors move or stop``

In block code, an ``if`` block lets the robot make a choice:

.. code-block:: text

   IF light level is at or above the chosen limit
       move forward
   ELSE
       stop

The robot is not frightened by the obstacle. It is simply following the rule
you wrote.

9. Loops, Variables, and Conditions
-----------------------------------

One decision only happens once. A robot usually needs to keep checking, so
programs also use loops, variables, and conditions:

Loop
   A loop repeats instructions. ``forever`` is a loop that keeps going until
   the micro:bit is switched off or reset.

Variable
   A variable is a named box that remembers a value. A variable called
   ``distance`` can remember the latest reading from the HC-SR04 ultrasonic module.

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

10. A Safe Way to Test Every Project
------------------------------------

Use this short routine whenever you try new code:

#. **Check the build.** Are the wheels free to turn? Are the plugs in the
   correct ports?
#. **Lift the driving wheels.** For the first motor test, keep them off the
   table so the car cannot race away.
#. **Start small.** Test one colored searchlight, N20 motor, or sensor before combining many
   parts.
#. **Use a slow speed.** Increase it only after the direction is correct.
#. **Watch and listen.** Stop if a part becomes hot, smells strange, jams, or
   makes an unusual sound.
#. **Change one thing.** Run the test again so you know what caused the new
   result.

11. When It Does Not Work: Be a Code Detective
-----------------------------------------------

Do not change everything at once. Ask these questions in order:

#. **Power:** Is the switch on? Do the batteries have enough power, and are
   they facing the right way?
#. **Program:** Did the ``.hex`` file finish copying to the micro:bit?
#. **Connection:** Is each plug fully inserted into the correct port?
#. **Start block:** Is the important code inside ``on start``, ``forever``, or
   the correct event?
#. **Value:** Is a speed set to zero? Is a distance or angle value sensible?
#. **Direction:** Is an N20 motor or sensor connected in the expected direction?
#. **One-part test:** Does the part work in a tiny program by itself?

Use the micro:bit display as a detective tool. Show a number, icon, or letter
at important points in your program. If the symbol appears, you know the
program reached that point.

12. Tiny Dictionary
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
      Physical parts you can touch, such as the micro:bit, N20 motor, and
      line-following sensor.

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

You are now ready to try the **Programming Examples**. Start with N20 motor
control or colored searchlights, then move on to sensor projects when those
first tests work.
