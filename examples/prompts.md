# Example prompts

Ask in plain language. The agent chooses the tools.

## A character and a first pose

    Create a mascot for this app: a calm capybara for a meditation tool,
    flat vector, soft muted colours, round and friendly. Then a waving
    pose, saved to public/mascot/waving.png.

## A set of UI states

Ask for the filenames you want. The agent writes them where you say, so
nothing has to be renamed afterwards.

    Using the existing mascot, generate three poses and save them into
    public/mascot/ as waving.png, thinking.png and celebrating.png:

    - waving at the viewer, welcoming
    - thinking, one paw to its chin
    - celebrating, arms up

## A prop, then the mascot holding it

    Create a coffee cup prop, then a pose of the mascot holding it, pleased
    with itself. Save both to assets/mascot/.

## Two characters in one image

    Put the capybara and the fox in one pose, chasing each other.

Two is the maximum. Each character is identified to the model by its
reference position, and that stops being reliable beyond two.

## A looping animation

    Animate the waving pose so it loops seamlessly, then save the MP4 to
    public/mascot/waving.mp4.

A seamless loop ends on the frame it began on, so it repeats with no visible
cut. That is what you want behind a loading state.

## An animation that lands somewhere specific

    Animate from the thinking pose to the celebrating pose.

Pinning the last frame stops the clip drifting off-model over four seconds,
which is what happens when only the first frame is fixed.

## A variant of an existing character

    Create a mascot based on the capybara: same design in light blue, a bit
    more awake. It is a round fluffy capybara with heavy eyelids and a small
    tuft on its head.

Note the second sentence. Describing only the change would store "a light
blue version of that one" as the new character's identity, and every pose
generated from it afterwards would have no appearance to work from.
