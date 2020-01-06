/**
 * Workaround to create an executable file of the application
 *
 * Only used for application build - use index.js for sourcecode usage!
 */

// Not the best workaround for the execDir but its working :)

let fullDir = process.argv[0].split("\\");
fullDir.pop();
__dirname = fullDir.join("\\");

// Not the best workaround for the execDir but its working :)